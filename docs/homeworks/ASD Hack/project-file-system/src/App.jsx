import React, { useState } from 'lib-app/react';
import foo from './ProjectFS';

// For testing.
const App = () => {
    const [state, setState] = useState(1);

    foo();

    return (
        <div style={{ height: '100%' }}>
            {state}
            <button onClick={() => setState((v) => v + 1)}>Inc</button>
        </div>
    );
};

export default App;
