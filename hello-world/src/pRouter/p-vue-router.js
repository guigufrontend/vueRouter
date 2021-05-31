let Vue
class PVueRouter{
    constructor(options){
        this.options = options;
        Vue.util.defineReactive(this, 'current',  window.location.hash.slice(1)||"/")
        window.addEventListener('hashchange',()=>{
            this.current = window.location.hash.slice(1)
        })
    }
}

PVueRouter.install=function(_Vue){
    Vue = _Vue;
    // 全局混入
    Vue.mixin({
        beforeCreate(){
            if(this.$options.router){
                Vue.prototype.$router = this.$options.router
            }
        }
    })
    
    // 注册router-view
    // 注册router-link
    Vue.component("router-view",{
        render(h){
            const {options, current} = this.$router
            const route = options.routes.find(item=>item.path==current)
            console.log(111111)
            return h(route.component)
        }
    })
    Vue.component("router-link",{
        props:{
            to:{
                type:String,
                require:true
            }
        },
        render(h){
            return h('a', {
                attrs:{
                    href: `#${this.to}`
                }
            }, this.$slots.default)
        }
    })
}
export default PVueRouter