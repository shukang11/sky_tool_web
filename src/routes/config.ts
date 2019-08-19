
export declare interface IMenuModel {
    key: string;
    title: string;
    icon: string;
    subs: Array<IMenuItem>;
}

export declare interface IMenuItem {
    key: string;
    title: string;
    icon?: string;
    component?: string;
}

const menus: Array<IMenuModel> = [{
    key: '/app/tool',
    title: '工具',
    icon: 'robot',
    subs: [
        {
            key: '/app/tool/todo',
            title: '待办',
            component: 'TodoComp',
        }
    ]
}]
export default menus;