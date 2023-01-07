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

const stackWidth: string = '250px';
const stackHeight: string = '250px';

const stackStyle = {
    borderRadius: '5px',
    width: stackWidth,
    height: stackHeight
}

type UpLoadProps = {
    saveFile: (file: any) => void,
    imgUrl: string
}

const Upload = ({saveFile, imgUrl}: UpLoadProps) => {
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
    const handleDrop = (event: React.DragEvent) => {
        // console.log('drop')
        event.preventDefault();
        event.stopPropagation();
        const file = event.dataTransfer.files[0];
        saveFile(file);
    }
    const handleDragOver = (event: React.SyntheticEvent) => {
        // console.log('drag over')
        event.preventDefault();
        event.stopPropagation();
    }
    const handleDragEnter = (event: React.SyntheticEvent) => {
        // console.log('drag enter')
        event.preventDefault();
        event.stopPropagation();
    }
    const handleDragLeave = (event: React.SyntheticEvent) => {
        // console.log('drag leave')
        event.preventDefault();
        event.stopPropagation();
    }
    // console.log(file)
    return (
        <div className='upload-container'>

            <Box draggable={true}
                 onDrop={e => handleDrop(e)}
                 onDragOver={e => handleDragOver(e)}
                 onDragEnter={e => handleDragEnter(e)}
                 onDragLeave={e => handleDragLeave(e)}
                 className={'comp-upload'} display={'flex'} justifyContent={'center'}
                 alignItems={'center'}
            >
                {
                    imgUrl
                        ? <Stack
                            sx={{
                                border: `2px dashed black`,
                                ...stackStyle,
                            }}
                        >
                            <img width={250} height={250} src={imgUrl} alt=""/>
                        </Stack>
                        :
                        <Stack
                            justifyContent={'center'}
                            alignItems={'center'}
                            sx={{
                                backgroundColor: ulBgColor,
                                border: `2px dashed ${ulBorderColor}`,
                                ...stackStyle
                            }}>
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
                }
                <input ref={inputUploadRef} accept={"image/png, image/jpeg"} type="file" onChange={chooseFile}/>
            </Box>

        </div>

    );
};

export default Upload;