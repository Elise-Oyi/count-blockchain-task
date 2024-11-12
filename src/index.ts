import startServer from "./app";

const PORT = process.env.PORT || 4000;

startServer().then((app) => {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}/graphql`);
  });
}).catch((error) => {
  console.error("Error starting server:", error);
});
