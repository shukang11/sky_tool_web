export default {
    menus: [ // 菜单路由
        {
            key: "/app/tool", title: "测试1", icon:"scan",
            subs: [
                {key: "/app/tool/todo", title: "待办", component: "TodoComp"}
            ]
        }
    ],
    others: []
}