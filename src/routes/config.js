export default {
    menus: [ // 菜单路由
        {
            key: "/app/tool", title: "工具", icon:"robot",
            subs: [
                {key: "/app/tool/todo", title: "待办", component: "TodoComp"}
            ]
        }
    ],
    others: []
}