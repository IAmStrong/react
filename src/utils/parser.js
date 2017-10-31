const parser = (response) => {
    const type = Array.isArray(response) ? 'array' : 'object';
    const actions = {
        'array': () => {
            let output = response;

            output.forEach((item) => {
                item.is_active = Number(item.is_active);
            });

            return output;
        },
        'object': () => {
            let output = response;

            output.is_active = Number(response.is_active);

            return output;
        }
    };

    return actions[type]();
};

export default parser;
