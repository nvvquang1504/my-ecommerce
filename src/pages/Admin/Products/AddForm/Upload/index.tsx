import './style.scss';
import React from 'react';
import {useRef, useState, useEffect} from 'react';
import {Box, Stack, Typography} from "@mui/material";
import {SlCloudUpload} from 'react-icons/sl'
import {blue} from '@mui/material/colors';

const ulBorderColor: string = blue[100];
const ulBgColor: string = blue[50];
const ulPrimaryColor: string = blue[500];
const acceptImgType: string[] = ['image/png', 'image/jpeg'];
const Upload = ({saveFile, imgUrl}: { saveFile: (file: any) => void, imgUrl: string }) => {

    const inputUploadRef = useRef<HTMLInputElement>(null);

    const browseFile = () => {
        inputUploadRef.current?.click();
    }
    const chooseFile = (event: React.SyntheticEvent) => {
        const target = event.target as HTMLInputElement;
        if (target.files && target.files[0]) {
            const file = target.files[0];
            saveFile(file)


        }
    }
    // console.log(file)
    return (
        <div className='upload-container'>
            {
                imgUrl
                    ?
                    <Box display={'flex'} justifyContent={'center'} alignItems={'center'} sx={{
                        width: '250px',
                        height: '250px',
                        border: `2px dashed black`,
                        borderRadius: '5px',
                    }}>
                        <img src={imgUrl} alt=""/>
                    </Box>
                    :
                    <Box draggable={true}
                         onDrag={() => {
                             console.log('start drag')
                         }}
                         onDrop={() => {
                             console.log('drop')
                         }}
                         className={'comp-upload'} display={'flex'} justifyContent={'center'}
                         alignItems={'center'}
                         sx={{
                             backgroundColor: ulBgColor,
                             border: `2px dashed ${ulBorderColor}`,
                             borderRadius: '5px',
                             width: '250px',
                             height: '250px'
                         }}>
                        <Stack justifyContent={'center'} alignItems={'center'}>
                            <SlCloudUpload size={32} color={ulPrimaryColor}/>
                            <span>
                                <b>Drag & drop file</b>
                                {`  or  `}
                                <span onClick={browseFile} style={{
                                    color: ulPrimaryColor,
                                    textDecoration: 'underline',
                                    fontSize: '1rem',
                                    cursor: 'pointer'
                                }}>
                                Browse
                             </span>
                        </span>
                            <span>Supported format: png, jpeg</span>
                        </Stack>
                        <input ref={inputUploadRef} accept={"image/png, image/jpeg"} type="file" onChange={chooseFile}/>
                    </Box>
            }
        </div>

    );
};

export default Upload;