import { InputFormikProps } from 'app/Modal/Modal';
import { IRootState } from 'app/redux/store';
import { Strings } from 'app/resource/Strings';
import { useStyletron } from 'baseui';
import { Input, StyledInput } from 'baseui/input';
import { Tag, VARIANT as TAG_VARIANT } from 'baseui/tag';
import Style from 'config/colors/colors';
import React from 'react'
import { useSelector } from 'react-redux';

interface TagsProps {
    formik: InputFormikProps
    label: string
    name: string
    inputValue: string | string[]
    tagValues: string[]
}
const Tags: React.FC<TagsProps> = ({
    formik,
    label,
    name,
    inputValue,
    tagValues,
}) => {
    const {currentTheme} = useSelector((state:IRootState) => state.UIStateData)
    const addTag = (tag: string) => {
        formik.setFieldValue("tags", [...tagValues, tag]);
        formik.setFieldValue(name, '');
    };
    const removeTag = (tag: string) => {
        const tags = tagValues.filter(t => t !== tag)
        formik.setFieldValue("tags", tags);
    };
    const handleKeyDown = (
        event: React.KeyboardEvent<HTMLInputElement>,
    ) => {
        switch (event.keyCode) {
            // Enter        
            case 32: {
                if (!inputValue) return;
                addTag(inputValue as string);
                return;
            }
            // Backspace
            case 8: {
                removeTag(tagValues[tagValues.length - 1]);
                return;
            }
        }
    };
    return (
        <div className='row mb-6'>
            <label className='col-lg-4 col-form-label fw-bold fs-6'>
                {label}
            </label>
            <div className={`col-lg-8 fv-row`}>
                <Input
                    placeholder={( tagValues.length > 0) ? '' : 'Enter A Tag'}
                    value={inputValue as string}
                    onChange={e => formik.setFieldValue("tagInput", e.currentTarget.value)}
                    overrides={{
                        Input: {
                            style: { width: 'auto', flexGrow: 1 },
                            component: InputReplacement,
                            props: {
                                tags: tagValues,
                                removeTag: removeTag,
                                onKeyDown: handleKeyDown,
                            },
                        },
                        Root: {
                            style: ({ $theme, $isFocused, $isReadOnly }) => ({
                                border:  currentTheme === Strings.light  ? $isFocused ?  `${Style.darkTheme.selectInput.background} !important` : `${Style.lightTheme.selectInput.focus.borderColor} !important` : `${Style.lightTheme.selectInput.focus.borderColor} !important` ,
                                borderColor: currentTheme === Strings.light  ? $isFocused ?  `${Style.darkTheme.selectInput.background} !important` : `${Style.lightTheme.selectInput.focus.borderColor} !important` : `${Style.lightTheme.selectInput.focus.borderColor} !important`,
                            }),
                        },
                        InputContainer: {
                            style: ({ $theme, $isFocused }) => ({
                                backgroundColor: $isFocused ? Style.lightTheme.selectInput.focus.background : Style.lightTheme.selectInput.background,
                                fontWeight: Style.defaultFontWeight,
                                color: Style.lightTheme.selectInput.color,
                                paddingLeft: Style.lightTheme.selectInput.dropDownOption.padding,
                                transition: "all .2s ease",
                            })
                        }
                    }}
                />
            </div>
        </div>
    );
}

const InputReplacement = React.forwardRef(
    ({ tags, removeTag, ...restProps }: any, ref) => {
        const [css] = useStyletron();
        return (
            <div
                className={css({
                    flex: '1 1 0%',
                    flexWrap: 'wrap',
                    display: 'flex',
                    alignItems: 'center',
                })}
            >
                {tags?.map((tag: string, index: number) => (
                    <Tag
                        variant={TAG_VARIANT.solid}
                        onActionClick={() => removeTag(tag)}
                        key={index}
                        overrides={{
                            Root: {
                              style: ({ $theme }) => ({
                                backgroundColor: "#a7a7a7",
                                color: 'whitesmoke'
                              })
                            }
                          }}
                    >
                        {tag}
                    </Tag>
                ))}
                <StyledInput ref={ref} {...restProps} />
            </div>
        );
    },
);

export default Tags