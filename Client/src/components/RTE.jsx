import React from 'react';
import {Editor} from "@tinymce/tinymce-react";
import { Controller } from 'react-hook-form';

function RTE({name, control, label, defaultValue=""}) {
  return (
    <div className='w-full'>
        {label && <label className='inline-block mb-1 pl-1'>{label}</label>}
        <Controller 
        name={name || "content"}
        control={control}
        render={({field:{onChange}})=>(
            <Editor 
                apiKey='rmv8jnehnavorv0hr70r4ls2amaaka4psbzyju3hp8ev4bd1'
                initialValue={defaultValue}
                init={{
                height: 500,
                menubar: true,
                plugins: 'advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table code help wordcount',
                toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help'
    }}
    onEditorChange={onChange}
/>

        )}
        />
    </div>
  )
}

export default RTE