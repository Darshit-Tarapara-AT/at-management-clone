import React from 'react';
import doc from '_metronic/assets/image/doc.jpeg';
import pdf from '_metronic/assets/image/pdf.png';
import xls from '_metronic/assets/image/excel.png';
import txt from '_metronic/assets/image/txt.png';
import zip from '_metronic/assets/image/zip.jpg';
import dummyImage from '_metronic/assets/image/dummy-image.jpg';
interface IProps {
    attachment: File
}
const CustomDownloadAttachment: React.FC<IProps> = ({
    attachment
}) => {
    const showFileImage = (attachmentFile: File) => {
        const allowFiles = [{
            type: 'xls',
            url: xls
        },
        {
            type: 'doc',
            url: doc
        },
        {
            type: 'pdf',
            url: pdf
        },
        {
            type: 'txt',
            url: txt
        },
        {
            type: 'zip',
            url: zip
        },
        ]
        const fileName = attachmentFile.name;
        const fileURL = allowFiles.find((file) => fileName.includes(file.type)) || { url: dummyImage };

        return <>
            <img src={fileURL.url} alt={fileName} width={50} />
        </>
    }
    return (
        <>
           {attachment && (
            <a href={URL.createObjectURL(attachment)} download={attachment.name}>
            {showFileImage(attachment)}
        </a>
        )}
        </>
    )
}

export default CustomDownloadAttachment