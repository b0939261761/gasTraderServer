const fastify = require('fastify')({ logger: true })


const port = process.env.SERVER_PORT;

// Declare a route
fastify.get('/', (request, reply) => {
  reply.send({ hello: process.env.NODE_ENV })
})

// Run the server!
fastify.listen(port, (err) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`server listening on ${fastify.server.address().port}`)
})