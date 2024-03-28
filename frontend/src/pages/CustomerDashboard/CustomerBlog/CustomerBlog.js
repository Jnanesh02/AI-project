import React from 'react'
import CustomerGraph from './CustomerGraph'
import CommentReplyCounter from './CommentReplyCounter'
import SuggestionComments from './SuggestionComments'

const CustomerBlog = () => {
  return (
    <div className='central-dashboard'>
     <h5> Central Dashboard </h5>
     <div className='container dashboard-cards-hm'>
      <CustomerGraph/>
      <CommentReplyCounter/>
      <SuggestionComments/>
      </div>
    </div>
  )
}

export default CustomerBlog
