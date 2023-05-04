const hendlerWrapper = hendler => {
    const func = async (io, socket) => {
        try {
            await hendler(io, socket);
        } catch (error) {
            console.log(error);
        };
    };
    return func;
};

module.exports = hendlerWrapper;