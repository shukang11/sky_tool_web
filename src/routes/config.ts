export declare interface IMenuModel {
  key: string;
  title: string;
  icon: string;
  subs?: Array<IMenuItem>;
  component?: string;
}

export declare interface IMenuItem {
  key: string;
  title: string;
  icon?: string;
  component?: string;
}

const menus: Array<IMenuModel> = [
  {
    key: "/app/dashboard",
    title: "看板",
    icon: "pie-chart",
    component: "Dashboard"
  },
  {
    key: "/app/tool/todo",
    title: "待办",
    icon: "robot",
    component: "TodoComp"
  },
  {
    key: "/app/rss",
    icon: "switcher",
    title: "Rss",
    subs: [
      {
        title: "订阅源",
        key: "/app/rss/source",
        component: "RssComp"
      },
      {
        title: "订阅列表",
        key: "/app/rss/content",
        component: "RssContent"
      }
    ]
  },
  {
    key: "/app/file",
    icon: "file",
    title: "文件管理",
    subs: [
      {
        title: "文件上传",
        key: "/app/file/upload",
        component: "FileUploadComp"
      }
    ]
  }
];
export default menus;
