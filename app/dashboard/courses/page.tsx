import React from "react";

// @Components
import BlogList from "@/components/containers/blog/BlogList";

export default async function BlogPage() {
    return (
        <div className='p-4'>
            <BlogList></BlogList>
        </div>
    )
}
