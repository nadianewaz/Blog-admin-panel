'use client'

import React, {useEffect, useState} from "react";
import dayjs from "dayjs";
import {useSearchParams} from 'next/navigation'

// @Ant
import {Button, Form, Modal, notification} from "antd";
import Title from "antd/es/typography/Title";

// @Components
import CoursesTable from "@/components/tables/coursesTable";
import CourseForm from "@/components/forms/courseForm";
import AdvanceSearchAndFilter from "@/components/ui/AdvanceSearchAndFilter";

// @Types
// import {PaginationType} from "@/models/paginationType";

// @Api
import {courseCreateApi, courseDeleteApi, courseListApi, courseUpdateApi} from "@/lib/services/courses";

// @Models
import {Course} from '@/models/coursesType';
import PaginationWithParams from "@/components/ui/PaginationWithParams";


const BlogList = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get('page') || '1';

  const [formKey, setFormKey] = useState<number>(0);
  const [course, setCourse] = useState<Course[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(Number(page));
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalElement, setTotalElement] = useState<number>(0);
  const [filter, setFilter] = useState<string>('');

  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [editCourse, setEditCourse] = useState<Course | null>(null);

  const [form] = Form.useForm();

  useEffect(() => {
    fetchCourse(currentPage, pageSize, filter);
  }, [currentPage, pageSize, filter]);

  // fetchUser
  const fetchCourse = async (page: number, size: number, filter: string) => {
    setIsLoading(true)
    // const pagination: PaginationType = {page, size}
    const response: any = await courseListApi()
    setTotalElement(response.pagination?.totalItems);
    setCourse(response.data)
    setIsLoading(false)
  };

  // onClick handle functions
  const showModal = () => {
    setFormKey(new Date().getTime())
    setOpen(true);
  };

  const onClickCancel = () => {
    form.resetFields();
    setOpen(false);
    setEditCourse(null)
  };

  const onClickSave = () => {
    setConfirmLoading(true);

    form
      .validateFields()
      .then((values: any) => {
        const {confirm, classes, ...course} = values
        course['class'] = classes.value
        if (!!editCourse) {
          const id: string = editCourse?._id;
          onCourseUpdateFormSubmit(course, id)
        } else {
          onCoursesAddFormSubmit(course)
        }
      }).catch((error) => {
      setConfirmLoading(false);
    });
  }

  const onClickCourseEdit = (course: Course) => {
    course.expirationDate = dayjs(course.expirationDate)
    setEditCourse(course)
    showModal()
  };

  const onClickCourseDelete = (user: Course) => {
    Modal.confirm({
      title: `Are you sure you want to delete ${user.courseName} ?`,
      content: 'This action cannot be undone.',
      centered: true,
      onOk() {
        onCourseDeleteConfirm(user._id);
      },
    });
  };

  const onFilter = (text: string) => {
    setCurrentPage(1)
    setFilter(text)
  }

  const onChangePagination = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  // Form submit handle functions

  const onCoursesAddFormSubmit = (newCourse: Course) => {
    courseCreateApi(newCourse)
      .then(() => {
        fetchCourse(currentPage, pageSize, filter);
        setConfirmLoading(false);
        onClickCancel();
        notification.success({
          message: 'Successfully created.',
        });
      })
      .catch(error => {
        setConfirmLoading(false);
        notification.error({
          message: error.message
        });
      });
  }

  const onCourseUpdateFormSubmit = (newCourse: Course, id: string) => {
    courseUpdateApi(newCourse, id)
      .then(() => {
        fetchCourse(currentPage, pageSize, filter);
        setConfirmLoading(false);
        onClickCancel();
        notification.success({
          message: 'Successfully updated.',
        });
      })
      .catch(error => {
        setConfirmLoading(false);
        notification.error({
          message: error.message
        });
      });
  }

  const onCourseDeleteConfirm = (id: string) => {
    courseDeleteApi(id)
      .then(() => {
        fetchCourse(currentPage, pageSize, filter);
        notification.success({
          message: 'Successfully deleted.',
        });
      })
      .catch(error => {
        notification.error({
          message: error.message
        });
      });
  }

  return (
    <>
      <div className="flex justify-between items-center pb-4">
        <Title level={2} className='mb-0'>Course List</Title>

        <Button type="primary" onClick={showModal} size={'large'}>
          Add Courses
        </Button>
      </div>
      <div className="table-container">
        <AdvanceSearchAndFilter onFilter={onFilter} classes={true} expired={true}/>

        <CoursesTable
          data={course}
          loading={isLoading}
          currentPage={currentPage}
          pageSize={pageSize}
          onEdit={onClickCourseEdit}
          onDelete={onClickCourseDelete}
        />

        <PaginationWithParams
          currentPage={currentPage}
          totalItems={totalElement}
          onPageChange={onChangePagination}
        />
      </div>

      <Modal
        title={<span className='text-3xl pb-4 block'>{!!editCourse ? 'Edit' : 'Create'} Course</span>}
        open={open}
        confirmLoading={confirmLoading}
        onCancel={onClickCancel}
        onOk={onClickSave}
        footer={[
          <Button key="back" onClick={onClickCancel} size="large" className='!px-8'>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={onClickSave} size="large" className='!px-8'>
            {!!editCourse ? 'Update' : 'Submit'}
          </Button>
        ]}
        width={810}
      >
        <CourseForm
          key={formKey}
          form={form}
          values={editCourse}
        />
      </Modal>
    </>
  )
}

export default BlogList
