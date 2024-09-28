import React, {useEffect, useRef, useState} from 'react';
import {Select, Space} from "antd";

// @Hook
import DebouncedSearch from "@/components/ui/DebouncedSearch";
import DebounceSelect from "@/components/ui/DebounceSelect";

// @constants
import statuses from "@/lib/constants/statuses";
import {classListApi} from "@/lib/services/classes";
import roles from "@/lib/constants/roles";
import difficultyLevels from "@/lib/constants/difficultyLevels";

// @types
import {SelectOption} from "@/lib/types/selectOption";
import {courseListApi} from "@/lib/services/courses";
import {subjectListApi} from "@/lib/services/subject";
import {chapterListApi} from "@/lib/services/chapter";
import {topicListApi} from "@/lib/services/topic";
import {institutesListApi} from "@/lib/services/institution";
import expiredStatuses from "@/lib/constants/expiredStatuses";
import profileStatuses from "@/lib/constants/profileStatuses";
import noticeTypes from '@/lib/constants/noticeTypes';
import bannerTypes from '@/lib/constants/bannerTypes';

interface AdvanceSearchAndFilterProps {
  onFilter: (value: string) => void;
  search?: boolean;
  number?: boolean;
  status?: boolean;
  classes?: boolean;
  course?: boolean;
  subject?: boolean;
  chapter?: boolean;
  topic?: boolean;
  role?: boolean;
  institute?: boolean;
  difficulty?: boolean;
  expired?: boolean;
  profile?: boolean;
  type?: boolean;
  bannerType?: boolean;
  searchPlaceholder?: string;
}

const AdvanceSearchAndFilter = (
  {
    onFilter,
    classes,
    course,
    subject,
    chapter,
    topic,
    role,
    institute,
    difficulty,
    expired,
    profile,
    type,
    bannerType,
    search = true,
    number = false,
    status = true,
    searchPlaceholder = "Search by name"
  }: AdvanceSearchAndFilterProps) => {

  const isFirstRender = useRef(true);

  const userRoles = roles?.map(role => ({label: role.name, value: role.id}))
  const [searchText, setSearchText] = useState<string>('');
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<boolean>();
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedChapter, setSelectedChapter] = useState<string>('');
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');
  const [selectedProfileStatus, setSelectedProfileStatus] = useState<boolean>();
  const [selectedExpired, setSelectedExpired] = useState<boolean>();
  const [selectedType, setSelectedType] = useState<boolean>();
  const [selectedBannerType, setSelectedBannerType] = useState<boolean>();
  const [selectedInstitute, setSelectedInstitute] = useState<string>('');

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false; // Set to false after the first render
      return;
    }

    let filter: string = ''
    if (!!searchText) filter += `&term=${searchText}`
    if (!!mobileNumber) filter += `&mobileNumber=${mobileNumber}`
    if (!!selectedRole) filter += `&role=${selectedRole}`
    if (!!selectedDifficulty) filter += `&difficulty=${selectedDifficulty}`
    if (!!selectedInstitute) filter += `&institution=${selectedInstitute}`
    if (!!selectedStatus?.toString()) filter += `&status=${selectedStatus}`
    if (!!selectedExpired?.toString()) filter += `&expired=${selectedExpired}`
    if (!!selectedProfileStatus?.toString()) filter += `&profile=${selectedProfileStatus}`
    if (!!selectedType) filter += `&type=${selectedType}`
    if (!!selectedBannerType) filter += `&type=${selectedBannerType}`

    if (!!selectedTopic) {
      filter += `&topic=${selectedTopic}`
    } else if (!!selectedChapter) {
      filter += `&chapter=${selectedChapter}`
    } else if (!!selectedSubject) {
      filter += `&subject=${selectedSubject}`
    } else if (!!selectedCourse) {
      filter += `&course=${selectedCourse}`
    } else if (!!selectedClass) {
      filter += `&class=${selectedClass}`
    }

    onFilter(filter)
  }, [searchText, mobileNumber, selectedRole, selectedDifficulty, selectedExpired, selectedInstitute, selectedProfileStatus,
    selectedClass, selectedStatus, selectedCourse, selectedSubject, selectedChapter, selectedTopic, selectedType, selectedBannerType]);

  // Calculate filters beforehand
  const courseFilter: string | undefined = selectedClass ? `&class=${selectedClass}` : undefined;
  const subjectFilter: string | undefined = selectedCourse ? `&course=${selectedCourse}` : (selectedClass ? `&class=${selectedClass}` : undefined);
  const chapterFilter: string | undefined = selectedSubject ? `&subject=${selectedSubject}` : (selectedCourse ? `&course=${selectedCourse}` : (selectedClass ? `&class=${selectedClass}` : undefined));
  const topicFilter: string | undefined = selectedChapter ? `&chapter=${selectedChapter}` : (selectedSubject ? `&subject=${selectedSubject}` : (selectedCourse ? `&course=${selectedCourse}` : (selectedClass ? `&class=${selectedClass}` : undefined)));


  const onSearch = (value: any) => {
    setSearchText(value)
  }
  const onMobileNumberSearch = (value: any) => {
    setMobileNumber(value)
  }

  const onSelectClass = (option: SelectOption) => {
    setSelectedClass(option?.value || '')
    setSelectedCourse('')
    setSelectedSubject('')
    setSelectedChapter('')
    setSelectedTopic('')
  }

  const onSelectCourse = (option: SelectOption) => {
    setSelectedCourse(option?.value || '')
    setSelectedSubject('')
    setSelectedChapter('')
    setSelectedTopic('')
  }

  const onSelectSubject = (option: SelectOption) => {
    setSelectedSubject(option?.value || '')
    setSelectedChapter('')
    setSelectedTopic('')
  }

  const onSelectChapter = (option: SelectOption) => {
    setSelectedChapter(option?.value || '')
    setSelectedTopic('')
  }

  const onSelectTopic = (option: SelectOption) => {
    setSelectedTopic(option?.value || '')
  }

  const onSelectInstitute = (option: SelectOption) => {
    setSelectedInstitute(option?.value || '')
  }

  const onSelectStatus = (value: boolean) => {
    setSelectedStatus(value)
  }

  const onSelectExpired = (value: boolean) => {
    setSelectedExpired(value)
  }

  const onSelectProfileStatus = (value: boolean) => {
    setSelectedProfileStatus(value)
  }

  const onSelectType = (value: boolean) => {
    setSelectedType(value)
  }
  const onSelectBannerType = (value: boolean) => {
    setSelectedBannerType(value)
  }

  const onSelectRole = (value: string) => {
    setSelectedRole(value)
  }

  const onSelectDifficulty = (value: string) => {
    setSelectedDifficulty(value)
  }

  return (
    <div className="advance-search flex justify-between">
      {search && <div className="search pb-2 max-w-md">
        <DebouncedSearch
          placeholder={searchPlaceholder}
          allowClear
          onChange={onSearch}/>
      </div>}
      {number && <div className="search pb-2 max-w-md">
        <DebouncedSearch
          placeholder="Search by number"
          allowClear
          onChange={onMobileNumberSearch}/>
      </div>}
      <Space wrap className="pb-2">
        {classes && <DebounceSelect
          placeholder="Filter by class"
          labelKey="className"
          fetchOptions={classListApi}
          onChange={onSelectClass}
          style={{width: 130}}
        />}
        {course && <DebounceSelect
          key={selectedClass}
          placeholder="Filter by course"
          labelKey="courseName"
          filter={courseFilter}
          fetchOptions={courseListApi}
          onChange={onSelectCourse}
          style={{width: 250}}
        />}
        {subject && <DebounceSelect
          key={selectedCourse}
          placeholder="Filter by subject"
          labelKey="subjectName"
          filter={subjectFilter}
          fetchOptions={subjectListApi}
          onChange={onSelectSubject}
          style={{width: 250}}
        />}
        {chapter && <DebounceSelect
          key={selectedSubject}
          placeholder="Filter by chapter"
          filter={chapterFilter}
          labelKey="chapterName"
          fetchOptions={chapterListApi}
          onChange={onSelectChapter}
          optionSize={500}
          style={{width: 250}}
        />}
        {topic && <DebounceSelect
          key={selectedChapter}
          placeholder="Filter by topic"
          labelKey="topicName"
          isHtmlLabel={true}
          filter={topicFilter}
          fetchOptions={topicListApi}
          onChange={onSelectTopic}
          optionSize={500}
          style={{width: 250}}
        />}
        {institute && <DebounceSelect
          placeholder="Filter by institute"
          labelKey="institutionShortName"
          filter={'&type=University'}
          fetchOptions={institutesListApi}
          onChange={onSelectInstitute}
          style={{width: 150}}
        />}
        {role && <Select
          allowClear
          placeholder='Filter by role'
          style={{width: 180}}
          onChange={onSelectRole}
          options={userRoles}
        />}
        {difficulty && <Select
          allowClear
          placeholder='Filter by difficulty'
          style={{width: 150}}
          onChange={onSelectDifficulty}
          options={difficultyLevels}
        />}
        {expired && <Select
          allowClear
          placeholder='Filter by expired'
          style={{width: 120}}
          onChange={onSelectExpired}
          options={expiredStatuses}
        />}
        {profile && <Select
          allowClear
          placeholder='Filter by profile status'
          style={{width: 180}}
          onChange={onSelectProfileStatus}
          options={profileStatuses}
        />}
        {status && <Select
          allowClear
          placeholder='Filter by status'
          style={{width: 140}}
          onChange={onSelectStatus}
          options={statuses}
        />}
        {type && <Select
          allowClear
          placeholder='Filter by type'
          style={{width: 180}}
          onChange={onSelectType}
          options={noticeTypes}
        />}
        {bannerType && <Select
          allowClear
          placeholder='Filter by type'
          style={{width: 140}}
          onChange={onSelectBannerType}
          options={bannerTypes}
        />}
      </Space>
    </div>
  );
};

export default AdvanceSearchAndFilter;
