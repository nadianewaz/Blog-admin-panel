import React from 'react';

import {Button, Space, Table, Tag} from 'antd';
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import { Course } from '@/models';
import DateAndTimeView from '../ui/DateAndTimeView';

const {Column} = Table;

type Props = {
    data: any[];
    currentPage: number;
    pageSize: number;
    loading: boolean;
    onEdit: (classes: Course) => void;
    onDelete: (classes: Course) => void;
}
const CoursesTable: React.FC<Props> = (
    {
        data,
        loading = true,
        currentPage,
        pageSize,
        onEdit,
        onDelete,
    }: Props) => {

    return (
        <Table rowKey="_id"
               size="small"
               dataSource={data}
               loading={loading}
               pagination={false}
        >
            <Table.Column
                title="SL No"
                key="index"
                render={(_, __, index) => ((currentPage - 1) * pageSize) + (index + 1)}
            />
            <Column title="Name" dataIndex="courseName"/>
            <Column title="Price" dataIndex="actualPrice"/>
            <Column title="Discount Price" dataIndex="discountedPrice"/>
            <Column title="Course Category" dataIndex="courseCategory"/>
            <Column title="Course Type" dataIndex="courseType"/>
            <Column title="Class Name" dataIndex={['class', 'className']}/>
            <Column title="Created By" dataIndex={['createdBy', 'email']}/>
          
            <Column title="Created Date"
                    dataIndex="createdAt"
                    render={(date) => <DateAndTimeView date={date} /> }/>

            <Column title="Expiration Date"
                    dataIndex="expirationDate"
                    render={(date) => <DateAndTimeView date={date} /> }/>

            <Column title="Status"
                    dataIndex="isActive"
                    render={(status) => 
                    <Tag color={status ? 'green' : 'red'}>{status ? 'Active' : 'In-active'}
                    </Tag>}/>

            <Column
                title="Action"
                key="action"
                className='w-28 !text-center'
                render={(_, record: any) => (
                    <Space size="middle">
                        <Button icon={<EditOutlined/>} onClick={() => onEdit(record)}/>
                        <Button icon={<DeleteOutlined/>} danger onClick={() => onDelete(record)}/>
                    </Space>
                )}
            />
        </Table>
    )
}

export default CoursesTable;
