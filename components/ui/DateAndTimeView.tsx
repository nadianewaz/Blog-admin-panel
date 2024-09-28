import React from 'react';

import dayjs from "dayjs";

// @Type 
interface DateTimeViewProps {
  date: string,
  isDateTime?: boolean
}


const DateAndTimeView = ({date, isDateTime = false}: DateTimeViewProps) => {


  let formatedDate = ''

  if(isDateTime) {
    formatedDate =  dayjs(date).format('DD MMM, YYYY hh:mm A');
  } else {
    formatedDate =  dayjs(date).format('DD MMM, YYYY');
  }


    return <span>{formatedDate}</span>
  
};

export default DateAndTimeView;
