import React, { FC, useState, useEffect } from 'react'
import { useTitle } from 'ahooks'
import { Typography, Empty, Spin } from 'antd'
import QuestionCard from '../../components/QuestionCard'
import ListSearch from '../../components/ListSearch'
import ListPage from '../../components/ListPage'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'
import styles from './common.module.scss'

const { Title } = Typography

const Star: FC = () => {
  useTitle('天哥问卷 - 星标问卷')

  const { data = {}, loading } = useLoadQuestionListData({})
  const { list = [], total = 0 } = data

  const filteredList = list.filter((q: any) => q.isStar)

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>星标问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        )}
        {!loading && filteredList.length === 0 && <Empty description="暂无数据" />}
        {filteredList.length > 0 &&
          filteredList.map((q: any) => {
            const { _id } = q
            return <QuestionCard key={_id} {...q} />
          })}
      </div>
      <div className={styles.footer}>
        <ListPage total={total} />
      </div>
    </>
  )
}

export default Star
