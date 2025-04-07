"use client";
import { usePathname } from 'next/navigation';
import React from 'react'
import {
    Breadcrumb,BreadcrumbItem,BreadcrumbLink,BreadcrumbList,BreadcrumbSeparator,} from "@/components/ui/breadcrumb"
import { MobileSideBar } from './Sidebar';


function BreadcrumbHeader() {
    const pathName= usePathname();
    const paths=pathName==="/" ? [""]: pathName?.split("/");
  return (
    <div className='flex items-center flex-start'>
      <MobileSideBar/><Breadcrumb><BreadcrumbList>{paths.map((path,index) =>(<React.Fragment key={index}><BreadcrumbItem><BreadcrumbLink className='capitalize' href={`/$ {path}`}>{path===''?"home":path}</BreadcrumbLink></BreadcrumbItem></React.Fragment>) )}</BreadcrumbList></Breadcrumb></div>
  )
}

export default BreadcrumbHeader