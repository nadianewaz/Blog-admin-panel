import React from 'react';
import {Layout} from 'antd';

import {Content, Footer} from "antd/es/layout/layout";

// @Components
import TopNavbar from "@/components/layout/topNavbar";
import SideNavbar from "@/components/layout/sideNavbar";

// @Utils
import {getUserRole} from "@/lib/utils/auth";

// @Types
import {UserRole} from "@/lib/types/session";

export default function DashboardLayout({children}: {
  children: React.ReactNode
}) {

  const userRole: UserRole = getUserRole()

  return (
    <>
      <Layout>
        <TopNavbar/>
        <Layout style={{flexDirection: 'row'}}>
          <SideNavbar role={userRole}/>
          <Layout>
            <Content style={{padding: '15px'}}>
              <div
                style={{
                  background: 'rgb(255, 255, 255)',
                  padding: 24,
                  minHeight: 'calc(100vh - 125px)',
                  borderRadius: '8px',
                }}
              >
                {children}
              </div>
            </Content>
            <Footer style={{textAlign: 'center', padding: '0 10px 10px 10px'}}>
              InnoSpace ©{new Date().getFullYear()} Created by Developer
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    </>
  )
}
