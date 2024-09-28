'use client'

import React, {useEffect, useState} from "react";
import cardImage from '@/public/images/cardImg.svg';
import cardImage2 from '@/public/images/cardImg2.svg';
import cardImage3 from '@/public/images/cardImg3.svg';
import cardImage4 from '@/public/images/cardImg4.svg';
import cardImage5 from '@/public/images/cardImg5.svg';
import cardImage6 from '@/public/images/cardImg6.svg';

// @ Ant 
import {Card, Col, Row, Spin} from 'antd';
import Image from "next/image";

import {getStates} from "@/lib/services/dashboard";


const {Meta} = Card;

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [state, setState] = useState<any>();

  useEffect(() => {
    fetchDashboardState()
  }, []);


  async function fetchDashboardState() {
    setIsLoading(true)
    const response = await getStates()
    setState(response)
    setIsLoading(false)
  }


  return (
    <>
      {isLoading && <div className="text-center pt-24">
        <Spin/>
      </div>}
      {!isLoading && <Row gutter={16}>
        <Col span={8}>
          <Card className="dashboard-card relative">
            <Image src={cardImage} alt="Course" className="img"></Image>
            <Meta title="Course"/>

            <div className="text-3xl pt-3 font-bold">{state.course}</div>
          </Card>
        </Col>
        <Col span={8}>
          <Card className="dashboard-card">
            <Image src={cardImage2} alt="card 2" className="img"></Image>
            <Meta title="Subject"/>

            <div className="text-3xl pt-3 font-bold">{state.subject}</div>
          </Card>
        </Col>
        <Col span={8}>
          <Card className="dashboard-card card-bg-colour">
            <Image src={cardImage3} alt="card 3" className="img"></Image>
            <Meta className="text-color"
                  title="MCQ"/>

            <div className="text-3xl pt-3 font-bold">{state.question}</div>
          </Card>
        </Col>
        <Col span={8}>
          <Card className="dashboard-card relative">
            <Image src={cardImage} alt="Course" className="img"></Image>
            <Meta title="Chapter"/>

            <div className="text-3xl pt-3 font-bold">{state.chapter}</div>
          </Card>
        </Col>
        <Col span={8}>
          <Card className="dashboard-card">
            <Image src={cardImage2} alt="card 2" className="img"></Image>
            <Meta title="Topic"/>

            <div className="text-3xl pt-3 font-bold">{state.topic}</div>
          </Card>
        </Col>
        <Col span={8}>
          <Card className="dashboard-card card-bg-colour">
            <Image src={cardImage3} alt="card 3" className="img"></Image>
            <Meta className="text-color"
                  title="Student"/>

            <div className="text-3xl pt-3 font-bold">{state.student}</div>
          </Card>
        </Col>
      </Row>
      }

      {/*<Row gutter={16}>*/}
      {/*  <Col span={8}>*/}
      {/*    <Card className="dashboard-card">*/}
      {/*      <Image src={cardImage4} alt="card 4" className="img"></Image>*/}
      {/*      <div className="flex flex-col space-y-12">*/}
      {/*        <div className=" card-top">*/}
      {/*          <div className="title-custom"> MCQ Question</div>*/}
      {/*          <div className="span"> 12,281</div>*/}
      {/*        </div>*/}

      {/*        <div className="flex justify-between text-base">*/}
      {/*          <div>*/}
      {/*            <div>Target</div>*/}
      {/*            <div className="font-medium">35,098</div>*/}
      {/*          </div>*/}
      {/*          <div className="hr-tag"></div>*/}

      {/*          <div>*/}
      {/*            <div>Duration</div>*/}
      {/*            <div className="font-medium">3,539</div>*/}
      {/*          </div>*/}
      {/*        </div>*/}

      {/*      </div>*/}

      {/*    </Card>*/}
      {/*  </Col>*/}
      {/*  <Col span={8}>*/}
      {/*    <Card className="dashboard-card">*/}
      {/*      <Image src={cardImage5} alt="card 5" className="img"></Image>*/}
      {/*      <div className="flex flex-col space-y-12">*/}
      {/*        <div className=" card-top">*/}
      {/*          <div className="title-custom"> Notice Management</div>*/}
      {/*          <div className="span"> 12,281</div>*/}
      {/*        </div>*/}

      {/*        <div className="flex justify-between text-base">*/}
      {/*          <div>*/}
      {/*            <div>Target</div>*/}
      {/*            <div className="font-medium">35,098</div>*/}
      {/*          </div>*/}
      {/*          <div className="hr-tag"></div>*/}

      {/*          <div>*/}
      {/*            <div>Duration</div>*/}
      {/*            <div className="font-medium">3,539</div>*/}
      {/*          </div>*/}
      {/*        </div>*/}

      {/*      </div>*/}

      {/*    </Card>*/}
      {/*  </Col>*/}
      {/*  <Col span={8}>*/}
      {/*    <Card className="dashboard-card">*/}
      {/*      <Image src={cardImage6} alt="card 6" className="img"></Image>*/}
      {/*      <div className="flex flex-col space-y-12">*/}
      {/*        <div className=" card-top">*/}
      {/*          <div className="title-custom"> Feedback</div>*/}
      {/*          <div className="span"> 12,281</div>*/}
      {/*        </div>*/}

      {/*        <div className="flex justify-between text-base">*/}
      {/*          <div>*/}
      {/*            <div>Target</div>*/}
      {/*            <div className="font-medium">35,098</div>*/}
      {/*          </div>*/}
      {/*          <div className="hr-tag"></div>*/}

      {/*          <div>*/}
      {/*            <div>Duration</div>*/}
      {/*            <div className="font-medium">3,539</div>*/}
      {/*          </div>*/}
      {/*        </div>*/}

      {/*      </div>*/}

      {/*    </Card>*/}
      {/*  </Col>*/}
      {/*</Row>*/}
    </>
  )
}