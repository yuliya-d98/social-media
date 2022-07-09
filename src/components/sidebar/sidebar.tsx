import React from 'react';
import { Link } from 'react-router-dom';

import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { MenuProps, Menu, Layout } from 'antd';

const { Sider } = Layout;

export const sideLink = ({ link, label }: SidebarChildItemType) => {
  return (
    <Link to={link} key={label}>
      {label}
    </Link>
  ) as unknown as string;
};

type SidebarChildItemType = {
  label: string;
  link: string;
};

type SidebarDataItemType = {
  id: number;
  icon: typeof UserOutlined;
  label: string;
  children: Array<SidebarChildItemType>;
};

const sidebarData: Array<SidebarDataItemType> = [
  {
    id: 0,
    icon: UserOutlined,
    label: 'Profile',
    children: [
      { label: 'My Profile', link: '/profile' },
      { label: 'Profile Settings', link: '/profile' },
    ],
  },
  {
    id: 1,
    icon: LaptopOutlined,
    label: 'Dialogs',
    children: [
      { label: 'Dialogs', link: '/dialogs' },
      { label: 'Chat', link: '/chat' },
    ],
  },
  {
    id: 2,
    icon: NotificationOutlined,
    label: 'Users',
    children: [
      { label: 'All Users', link: '/users' },
      { label: 'Followed', link: '/users?friend=true' },
      { label: 'Not Followed', link: '/users?friend=false' },
    ],
  },
];

const sidebarItems: MenuProps['items'] = sidebarData.map((item, index) => {
  const key = item.id.toString();

  return {
    key: `sub${key}`,
    icon: React.createElement(item.icon),
    label: item.label,

    children: item.children.map((child, childIndex) => {
      const subKey = index * 10 + childIndex;
      const label = sideLink(child);
      return {
        key: subKey,
        label: label,
      };
    }),
  };
});

export const Sidebar: React.FC = () => {
  return (
    <Sider className="site-layout-background" width={200}>
      <Menu
        mode="inline"
        defaultSelectedKeys={['0']}
        defaultOpenKeys={['sub0']}
        style={{ height: '100%' }}
        items={sidebarItems}
      />
    </Sider>
  );
};
