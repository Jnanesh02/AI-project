import React from 'react'
import CustomerGraph from './CustomerGraph'
import CommentReplyCounter from './CommentReplyCounter'
import SuggestionComments from './SuggestionComments'

const CustomerBlog = () => {
  return (
    <div>
      <h1>Dashboard</h1>
     <div className='d-flex justify-content-around'>
      <CustomerGraph/>
      <CommentReplyCounter/>
      <SuggestionComments/>
      </div>
    </div>
  )
}

export default CustomerBlog
