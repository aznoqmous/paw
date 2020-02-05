import Route from './route'

export default class Router {

  constructor(routes=[]){
    this.routes = routes
  }

  routeMatch(request) {
      let path = (new URL(request.url)).pathname
      let matches = this.routes.filter((route) => {
          if (!route.methods.toLowerCase().match(request.method.toLowerCase())) return false; // methods dont match
          if (route.offline && navigator.onLine) return false; // dont serve offline routes if online
          if (route.online && !navigator.onLine) return false; // dont serve online routes if offline
          if(!path.match(route.regPath)) return false;
          return true;
      })

      return matches
  }

  resolve(fetchEvent){
      return new Promise((res, rej)=>{
          let routes = this.routeMatch(fetchEvent.request)
          let response = null
          let finalRoute = null
          routes.map(route => {
              if(response) return false
              response = this.controller(route, fetchEvent)
              finalRoute = route
          })
          if (response && response.constructor.name == 'Promise') response.then(res => {
              res( new Response(res, {status: 200, headers: finalRoute.headers}) )
          })
          else if (response && response.constructor.name == 'Response') res( response )
          else if (response) res( new Response(response, {status: 200, headers: finalRoute.headers}) )
          else rej(finalRoute)
      })
  }

  controller(route, e) {
      if(!route.callback) return false

      let capture = (new URL(e.request.url)).pathname.match(route.regPath)
      let res = null

      if(capture){
          let values = []
          for (let key in capture.groups ) values.push(capture.groups[key])
          res = route.callback(e, ...values)
      }
      else {
          res = route.callback(e)
      }

      return (res) ? res : false;
  }

  // register routes
  route(path, callback=null, config={}) {
      let route = new Route(path, callback, config)
      this.routes.push(route)
      return route
  }
  json(path, callback, config = {}){
      return this.route(path, ()=>{ return JSON.stringify( callback() ) }, Object.assign(config, {json: true}))
  }

  // register offline routes
  offline(path, callback, config = {}) {
      return this.route(path, callback, Object.assign(config, {offline: true}))
  }

  // register online routes
  online(path, callback, config = {}) {
      return this.route(path, callback, Object.assign(config, {online: true}))
  }

  redirect(from, to, config={}){
      return this.route(from, ()=>{ return this.redirectResponse(to) }, config)
  }
  redirectResponse(path) {
      return Response.redirect(path, 302);
  }

}
