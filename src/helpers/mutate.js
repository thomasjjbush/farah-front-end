export const arrangeServices = async (res) => {
    return new Promise((resolve) => {
        let services = {};
        for ( var i = 0; i < res.length; i++ ) {
            if ( !services.hasOwnProperty(res[i].subCategory) ) {
                services = {...services, [res[i].subCategory]: [res[i]]};
            } else services = {...services, [res[i].subCategory]: [...services[res[i].subCategory], res[i]]}
        }
        resolve(services);
    })
}