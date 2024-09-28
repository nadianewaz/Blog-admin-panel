'use client'

import React, {useEffect, useState} from 'react';
import Link from "next/link";
import {usePathname} from "next/navigation";
import {BookOutlined, DashboardOutlined, PicLeftOutlined, SettingOutlined, UserOutlined} from "@ant-design/icons";
import {Menu, MenuProps, theme} from 'antd';
import Sider from "antd/lib/layout/Sider";
import {ItemType} from "antd/es/menu/interface";

// @Type
import {UserRole} from "@/lib/types/session";

// @Constants
import {protectedPaths} from "@/lib/constants/pageList";

const menus: MenuProps['items'] | any = [
  {
    key: '/dashboard',
    icon: React.createElement(DashboardOutlined),
    label: <Link href="/dashboard">Dashboard</Link>,
  },
  {
    key: 'books',
    icon: React.createElement(BookOutlined),
    label: 'Program Management',
    children: [
      {
        key: '/dashboard/class',
        label: (<Link href="/dashboard/class">Class</Link>),
      },
      {
        key: '/dashboard/courses',
        label: (<Link href="/dashboard/courses">Course</Link>),
      },
      {
        key: '/dashboard/subject',
        label: (<Link href="/dashboard/subject">Subject</Link>)
      },
      {
        key: '/dashboard/chapter',
        label: (<Link href="/dashboard/chapter">Chapter</Link>)
      },
      {
        key: '/dashboard/topic',
        label: (<Link href="/dashboard/topic">Topic</Link>),
      },
    ]
  },
  {
    key: 'mcq',
    icon: React.createElement(PicLeftOutlined),
    label: 'MCQ',
    children: [
      {
        key: '/dashboard/mcq/image',
        label: (<Link href="/dashboard/mcq/image">Image</Link>),
      },
      {
        key: '/dashboard/mcq',
        label: (<Link href="/dashboard/mcq">List</Link>),
      },
      {
        key: '/dashboard/mcq/create',
        label: (<Link href="/dashboard/mcq/create">Create</Link>),
      },
    ]
  },

  {
    key: 'live-exam-mcq',
    icon: React.createElement(PicLeftOutlined),
    label: 'Live Exam MCQ',
    children: [
      {
        key: '/dashboard/live-exam/mcq/image',
        label: (<Link href="/dashboard/live-exam/list">List</Link>),
      },
      {
        key: '/dashboard/live-exam/mcq/image',
        label: (<Link href="/dashboard/live-exam/create">Create</Link>),
      },
      {
        key: '/dashboard/live-exam/mcq',
        label: (<Link href="/dashboard/live-exam/mcq">MCQ List</Link>),
      },
      {
        key: '/dashboard/live-exam/mcq/create',
        label: (<Link href="/dashboard/live-exam/mcq/create">MCQ Create</Link>),
      },
      {
        key: '/dashboard/live-exam/mcq/image',
        label: (<Link href="/dashboard/live-exam/mcq/image">MCQ Image</Link>),
      },
    ]
  },
  {
    key: 'user-management',
    icon: React.createElement(UserOutlined),
    label: 'Users Management',
    children: [
      {
        key: '/dashboard/user',
        label: (<Link href="/dashboard/user">Admin</Link>),
      },
      {
        key: '/dashboard/student',
        label: (<Link href="/dashboard/student">Student</Link>),
      }
    ]
  },
  {
    key: 'setting',
    icon: React.createElement(SettingOutlined),
    label: 'Setting',
    children: [
      {
        key: '/dashboard/institution',
        label: (<Link href="/dashboard/institution"> Institution </Link>),
      },
      {
        key: '/dashboard/qr',
        label: (<Link href="/dashboard/qr"> QR Management </Link>),
      },
      {
        key: '/dashboard/notice',
        label: (<Link href="/dashboard/notice"> Notice Management </Link>),
      },
      {
        key: '/dashboard/session',
        label: (<Link href="/dashboard/session"> Session </Link>),
      },
      {
        key: '/dashboard/configure',
        label: (<Link href="/dashboard/configure"> Configure </Link>),
      },
      {
        key: '/dashboard/feedback',
        label: (<Link href="/dashboard/feedback"> Feedback </Link>),
      },
      {
        key: '/dashboard/transaction',
        label: (<Link href="/dashboard/transaction"> Transaction </Link>),
      },
      {
        key: '/dashboard/refund',
        label: (<Link href="/dashboard/refund"> Refund </Link>),
      },
      {
        key: '/dashboard/blockuser',
        label: (<Link href="/dashboard/blockuser"> Block User </Link>),
      },
      {
        key: '/dashboard/banner',
        label: (<Link href="/dashboard/banner"> Banner </Link>),
      },
    ]
  }

];

type SidebarType = {
  role: UserRole
}

function SideNavbar({role}: SidebarType) {
  const pathname = usePathname();
  const [visibleMenus, setVisibleMenus] = useState<MenuProps['items']>([]);
  const [openKey, setOpenKey] = useState<string>('');
  const [activeMenu, setActiveMenu] = useState(pathname);
  const {token: {colorBgContainer, borderRadiusLG}} = theme.useToken();

  const onMenuChange = (menu: any) => {
    setOpenKey(menu[1]);
  }

  useEffect(() => {
    const hasAccess = (key: string) => !!protectedPaths[key]?.includes(role);

    // Recursively filter menu items based on role access
    const filterMenus = (menu: ItemType | any): MenuProps['items'] => {
      if (menu.children && menu.children.length > 0) {
        const filteredChildren = menu.children.filter((child: ItemType | any) => hasAccess(child.key));
        menu.children = filteredChildren;
        return filteredChildren.length > 0 ? menu : null;
      } else {
        return hasAccess(menu.key) ? menu : null;
      }
    };

    // Apply filter to each menu item and remove null entries
    const filteredMenus: any[] = menus?.map(filterMenus).filter((menu: ItemType | any) => menu !== null) || [];

    setVisibleMenus(filteredMenus);
  }, [role]);

  useEffect(() => {
    let parentKey: string = '';

    for (const menu of menus ?? []) {
      for (const childMenu of menu?.children ?? []) {
        if (childMenu.key === pathname) {
          parentKey = menu?.key + '';
          break;
        }
      }
      if (!!parentKey) break;
    }

    setOpenKey(`${parentKey}`);
    setActiveMenu(pathname);
  }, [pathname, menus]);


  return (
    <Sider width={220} style={{background: colorBgContainer}}>
      <Menu
        mode="inline"
        selectedKeys={[activeMenu]}
        openKeys={[openKey]}
        onOpenChange={onMenuChange}
        style={{height: '100%', borderRight: 0, marginTop: 15}}
        items={visibleMenus}
      />
    </Sider>
  );
}

export default SideNavbar;
