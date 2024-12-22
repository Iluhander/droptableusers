import React, { useState, useEffect } from 'lib-app/react';
import ReactFlow, { Background } from 'lib-app/reactflow';
import 'reactflow/dist/style.css';
import * as yaml from 'lib-app/js-yaml';

// Define BusEvent class
class BusEvent {
    fileURL;
    fileVal;

    constructor(fileURL, fileVal) {
        this.fileURL = fileURL;
        this.fileVal = fileVal;
    }
}

const customTags = [
    '!PythonFunction',
    '!BasicStage',
    '!MonitoringService',
    '!GenericPipeline',
    '!FilePath',
    '!path',
    '!NgrokService',
    '!ForEach',
    '!If',
    '!ExpressionEval',
    '!MultiLine',
];

const customSchema = yaml.DEFAULT_SCHEMA.extend(
    customTags.map(tag =>
        new yaml.Type(tag, {
            kind: 'mapping',
            construct: data => data,
        })
    )
);

const parseYamlToGraph = (yamlInput) => {
    const nodes = [];
    const edges = [];
    const anchors = {};

    try {
        const parsed = yaml.load(yamlInput, { schema: customSchema });

        const traverse = (
            obj,
            parentId,
            depth,
            siblingIndex,
            keyName = null
        ) => {
            if (!obj || typeof obj !== 'object' || Object.keys(obj).length === 0) {
                return;
            }

            const currentNodeId = `node-${nodes.length + 1}`;
            const nodeLabel = obj.name || keyName || `Unnamed Node ${nodes.length + 1}`;
            const x = siblingIndex * 200; // Adjust spacing as needed
            const y = depth * 150;

            nodes.push({
                id: currentNodeId,
                position: { x, y },
                data: { label: nodeLabel },
            });

            if (parentId) {
                edges.push({
                    id: `${parentId}-${currentNodeId}`,
                    source: parentId,
                    target: currentNodeId,
                });
            }

            if (obj.outputs) {
                Object.entries(obj.outputs).forEach(([key, value]) => {
                    if (typeof value === 'string') {
                        anchors[value] = currentNodeId;
                    }
                });
            }

            if (obj.inputs) {
                const inputAnchor = anchors[obj.inputs];
                if (inputAnchor) {
                    edges.push({
                        id: `${inputAnchor}-${currentNodeId}`,
                        source: inputAnchor,
                        target: currentNodeId,
                    });
                }
            }

            if (obj.runs && Array.isArray(obj.runs)) {
                obj.runs.forEach((child, index) => {
                    traverse(child, currentNodeId, depth + 1, index);
                });
            }
        };

        if (parsed) {
            Object.entries(parsed).forEach(([key, value]) => {
                traverse(value, null, 0, 0, key);
            });
        }
    } catch (err) {
        console.error('Error parsing YAML:', err);
    }

    return { nodes, edges };
};

const App = () => {
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);

    // Function to process BusEvent and render the graph
    const handleBusEvent = (event) => {
        try {
            const { fileVal } = event;
            const { nodes, edges } = parseYamlToGraph(fileVal);
            setNodes(nodes);
            setEdges(edges);
        } catch (error) {
            console.error('Error processing BusEvent:', error);
        }
    };

    useEffect(() => {
        // Expose setCode and handleBusEvent via a global API
        const visualizerApi = {
            setCode: (code) => {
                const { nodes, edges } = parseYamlToGraph(code);
                setNodes(nodes);
                setEdges(edges);
            },
            processBusEvent: (event) => {
                handleBusEvent(event);
            },
        };

        if (typeof window !== 'undefined') {
            (window).visualizer = visualizerApi;
        }
    }, []);

    return (
        <div style={{ height: '100vh' }}>
            <ReactFlow nodes={nodes} edges={edges}>
                <Background />
            </ReactFlow>
        </div>
    );
};

export default App;
