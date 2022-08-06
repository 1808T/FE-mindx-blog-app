import React from "react";
import { Image, Avatar } from "antd";
import parse from "html-react-parser";
import moment from "moment";
import { Link, NavLink } from "react-router-dom";

const PostList = ({ allPosts }) => {
  return (
    // <>
    //   {allPosts &&
    //     allPosts.map(post => {
    //       return (
    //         <div key={post._id} className="g-col-6 g-col-md-4 card mb-5">
    //           <div className="card-header d-flex justify-content-between">
    //             <div>
    //               {post && post.postedBy && !post.postedBy.avatar ? (
    //                 <Avatar
    //                   style={{
    //                     color: "#f56a00",
    //                     backgroundColor: "#fde3cf"
    //                   }}>
    //                   {post.postedBy.username[0].toUpperCase()}
    //                 </Avatar>
    //               ) : (
    //                 <Avatar size={32} src={post.postedBy.avatar.url} />
    //               )}
    //               <h5>author: {post.postedBy.username}</h5>
    //             </div>

    //             <h6>time: {moment(post.updatedAt).fromNow()}</h6>
    //           </div>
    //           {post.image && post.image.url ? (
    //             <>
    //               <Link
    //                 className="card-body d-flex flex-column justify-content-center align-items-center"
    //                 style={{
    //                   background: `url(${post.image.url}), no-repeat`,
    //                   backgroundSize: "cover",
    //                   width: "400px",
    //                   height: "300px"
    //                 }}
    //                 to="/"></Link>
    //               <div>
    //                 <h5>{post.title}</h5>
    //                 <h6>{post.description}</h6>
    //               </div>
    //             </>
    //           ) : (
    //             <div className="card-body d-flex flex-column justify-content-center align-items-center"></div>
    //           )}
    //           {/* <div className="card-body d-flex flex-column justify-content-center align-items-center">
    //             {post.image && post.image.url ? (
    //               <div>
    //                 Image:
    //                 <Image width={500} src={post.image.url} />
    //                 Content:
    //                 {parse(post.content)}
    //               </div>
    //             ) : (
    //               <>Content: {parse(post.content)}</>
    //             )}
    //           </div> */}
    //           <div className="card-footer d-flex flex-column justify-content-center align-items-start">
    //             {post && post.postedBy && !post.postedBy.avatar ? (
    //               <Avatar
    //                 style={{
    //                   color: "#f56a00",
    //                   backgroundColor: "#fde3cf"
    //                 }}>
    //                 {post.postedBy.username[0].toUpperCase()}
    //               </Avatar>
    //             ) : (
    //               <Avatar size={32} src={post.postedBy.avatar.url} />
    //             )}
    //             <h5>author: {post.postedBy.username}</h5>
    //             <h5>Title: {post.title}</h5>
    //             <h6>Description: {post.description}</h6>
    //             <NavLink to={`/${post._id}`}>
    //               <button className="btn btn-dark">Detail</button>
    //             </NavLink>
    //           </div>
    //         </div>
    //       );
    //     })}
    // </>
    <div>
      <div>A</div>
    </div>
  );
};

export default PostList;
