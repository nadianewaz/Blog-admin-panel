import React, {useEffect} from 'react';

// @Ant
import {Col, DatePicker, Form, Input, InputNumber, Radio, Row, Select} from 'antd';
const {TextArea} = Input;

import dayjs from "dayjs";

// @Services
import {classListApi} from '@/lib/services/classes';

// @Component
import DebounceSelect from "@/components/ui/DebounceSelect";
import courseTypes from "@/lib/constants/courseTypes";
import useCustomFormRules from "@/lib/hooks/useCustomFormRules";


interface Props {
    form: any,
    values?: any
}

const CourseForm = ({form, values}: Props) => {
    const dateFormat: string = 'DD-MM-YYYY';
    const { getEmptyCheckRules } = useCustomFormRules()

    useEffect(() => {
        if (!!values) {
            form.resetFields();
            form.setFieldsValue({
                ...values,
                classes: {
                    key: values?.class?._id,
                    value: values?.class?._id,
                    label: values?.class?.className,
                },
            });
        }

    }, [values, form]);


  return (
        <Form
            form={form}
            name="courseForm"
            className="max-w-3xl w-full m-auto mt-6"
            layout="vertical"
            autoComplete="off"
            size={'large'}
        >

            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item
                        label="Course Name"
                        name="courseName"
                        className='!mb-2'
                        rules={[
                          {required: true, message: 'Please input your course name.'},
                            getEmptyCheckRules('Course name')
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label="Course Type"
                        name="courseType"
                        className='!mb-2'
                        rules={[{required: true, message: 'Please input your course type'}]}
                    >
                        <Select
                          allowClear
                          placeholder='Select a type'
                          options={courseTypes}
                        />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item
                        label="Class"
                        className='!mb-2'
                        name="classes"
                        rules={[{required: true, message: 'Please input your class'}]}
                    >
                        <DebounceSelect
                            placeholder="Search.."
                            style={{width: '100%'}}
                            labelKey="className"
                            fetchOptions={classListApi}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                      label="Course Category"
                      name="courseCategory"
                      className='!mb-2'
                      rules={[
                        {required: true, message: 'Please input your course category.'},
                          getEmptyCheckRules('Course name')
                      ]}
                    >
                        <Input/>
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item
                      label="Price"
                      name="actualPrice"
                      className='!mb-2'
                      rules={[{required: true, message: 'Please input course price.'}]}
                    >
                        <InputNumber min={0} style={{ width: '100%' }} />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item
                      label="Discount Price"
                      name="discountedPrice"
                      className='!mb-2'
                    >
                        <InputNumber min={1} style={{ width: '100%' }} />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item
                        label="Expiration Date"
                        className='!mb-2'
                        name="expirationDate"
                        rules={[{required: true, message: 'Please input Expiration Date'}]}
                    >
                        <DatePicker showNow={false}
                                    style={{ width: '100%' }}
                                    format={dateFormat}
                                    minDate={dayjs()} />
                    </Form.Item>
                </Col>

                {
                  values && <Col span={12}>
                      <Form.Item
                        label="Status"
                        name="isActive"
                        className='!mb-2'
                      >
                          <Radio.Group buttonStyle="solid">
                              <Radio.Button value={true}>Active</Radio.Button>
                              <Radio.Button value={false}>Inactive</Radio.Button>
                          </Radio.Group>
                      </Form.Item>
                  </Col>
                }

                <Col span={24}>
                    <Form.Item
                        label="Description"
                        name="description"
                        className='!mb-2'
                    >
                        <TextArea rows={4}
                                  placeholder="Type here..."
                                  maxLength={600}/>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};

export default CourseForm;