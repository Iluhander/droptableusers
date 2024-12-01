import createFastify from 'fastify';
import staticPlugin from '@fastify/static';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { parseArgs } from 'util';

const server = createFastify();

// Setting up the files server.
const __filename = fileURLToPath(import.meta.url);
server.register((childContext, _, done) => {
  childContext.register(staticPlugin, {
    root: path.join(dirname(__filename), 'build'),
    wildcard: true,
  });

  childContext.setNotFoundHandler((_, reply) => {
    return reply.code(200).type('text/html').sendFile('index.html');
  });

  done();
});

// Finding out the required port.
const { port, host } = parseArgs({
  args: process.argv,
  options: {
    port: {
      type: 'string',
      default: '3223',
    },
    host: {
      type: 'string',
      default: '0.0.0.0',
    },
  },
  allowPositionals: true,
}).values;

server.listen({ port, host }, (err, addr) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Server is listening for ${addr}`);
});
