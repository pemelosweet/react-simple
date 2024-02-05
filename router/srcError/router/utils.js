export function matchRoutes(routes, location) {
    const { pathname } = location;
    let branches = flattenRoutes(routes);
    let matches = null;
    for (let i = 0; matches === null && i < branches.length; i++) {
        matches = matchRouteBranch(branches[i], pathname);
    }
    return matches
}
export function matchRouteBranch(branch,pathname){
    let {routesMeta} = branch;
    let matchedPathname = '/';
    let matchedParams = {};
    let matches = [];
    console.log(branch,routesMeta,'routesMeta');
    for (let i = 0; i < routesMeta.length; i++) {
        const meta = routesMeta[i];
        const end = i === routesMeta.length-1;
        const remainingPathname = matchedPathname==='/'?
        pathname:pathname.slice(matchedPathname.length)||'/';
        let match = matchPath({path:meta.relativePath,end},remainingPathname);
        if(!match){
            return null;
        }
        Object.assign(matchedParams,match.params);
        let route = meta .route;
        matchedPathname=joinPaths([matchedPathname,match.pathname]);
        matches.push({
            params:matchedParams,//路径参数对象
            route,//路由对象{path,element}
            pathname:matchedPathname//到此为止匹配的路径 /user/add
        });
    }
    return matches;
}
export function matchPath({path,end},pathname){
    const [matcher,paramNames] = compilePath(path,end);
    let match = pathname.match(matcher);
    if(!match) return null;
    let matchedPathname = match[0];
    let captureGroups = match.slice(1);//100
    let params = paramNames.reduce((memo,paramName,index)=>{
        memo[paramName]=captureGroups[index]
        return memo;
    },{});
    return {
        params,
        pathname:matchedPathname
    }
}
function flattenRoutes(routes, branches = [], parentsMeta = [], parentPath = '') {
    function flattenRoute(route, index) {
        let meta = {
            relativePath: route.path,
            route: route,
            childrenIndex: index
        }
        let routePath = joinPaths([parentPath, meta.relativePath]);
        const routesMeta = [...parentsMeta, meta];
        if (route.children && route.children.length > 0) {
            flattenRoutes(route.children, branches, routesMeta, routePath)
        }
        branches.push({ path: routePath, routesMeta })

    }
    routes.forEach((route, index) => {
        flattenRoute(route, index);
    });
    return branches
}
function joinPaths(paths) {
    return paths.join('/').replace(/\/\/+/g, '/') //一个/或者多个/都将替换成一个/
}
function compilePath(path,end=true){
    let paramNames = [];
    // /:name => /([^\\/]+)  
    let regexpSource = "^"+path
    .replace(/\/+$/,'')///    /user/   /user// /user///
    .replace(/^\/*/,'/')// 把开头的0个或多个/变成一个/  /user,user=>//user=>/user
    .replace(/\/:(\w+)/g,(_,paramName)=>{
        paramNames.push(paramName);
        return '/([^\\/]+)';
    })
    if(end){
        regexpSource+='$'
    }
    let matcher = new RegExp(regexpSource);
    return [matcher,paramNames];
}