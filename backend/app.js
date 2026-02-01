const logServerStatus = (port) => {
    console.log(`[${new Date().toISOString()}] INFO: Server is initializing on port ${port}`);
};

export { logServerStatus };