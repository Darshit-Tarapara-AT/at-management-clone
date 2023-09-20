import {Strings} from 'app/resource/Strings'
import Style from 'config/colors/colors'

type IsFocusTask = boolean

interface Input {
  $isFocused?: IsFocusTask
  $isHighlighted?: IsFocusTask
  $isReadOnly?: IsFocusTask
  $selected?: IsFocusTask
}
export const TEXT_AREA_KEY = 'textarea'
export const INPUT_KEY = 'input'
export const SELECT_INPUT_KEY = 'select'
export const PAGINATION_CHANGE_PAGE_KEY = 'paginationPage'
export const PAGINATION_CHANGE_SIZE_KEY = 'paginationSize'
export const FILTER_SELECT_INPUT = 'filterSelectInput'
export const TIMER_PICKER_INPUT = 'timePicker'

/**
 * 
 * @param currentTheme 
 * @returns Time picker style
 */
const timePickerStyle = (currentTheme: string) => {
  return {
    Select: {
      props: {
          overrides: {
              Root: {
                  style: ({ $isFocused }: { $isFocused: boolean }) => ({
                    border:
                    currentTheme === Strings.light
                      ? $isFocused
                        ? `${Style.darkTheme.selectInput.background} !important`
                        : `${Style.lightTheme.selectInput.focus.borderColor} !important`
                      : `${Style.lightTheme.selectInput.focus.borderColor} !important`,
                  borderColor:
                    currentTheme === Strings.light
                      ? $isFocused
                        ? `${Style.darkTheme.selectInput.background} !important`
                        : `${Style.lightTheme.selectInput.focus.borderColor} !important`
                      : `${Style.lightTheme.selectInput.focus.borderColor} !important`,
                  })
              },
              ControlContainer: {
                  style: ({ $isFocused }: { $isFocused: boolean }) => ({
                      color: "#5E6278",
                      backgroundColor: currentTheme === Strings.light ? $isFocused ? Style.lightTheme.selectInput.focus.background : Style.lightTheme.selectInput.background : $isFocused ? Style.darkTheme.selectInput.background : Style.darkTheme.selectInput.background,
                      boxShadow: "0px",
                      border:
                      currentTheme === Strings.light
                        ? $isFocused
                          ? `${Style.darkTheme.selectInput.background} !important`
                          : `${Style.lightTheme.selectInput.focus.borderColor} !important`
                        : `${Style.lightTheme.selectInput.focus.borderColor} !important`,
                    borderColor:
                      currentTheme === Strings.light
                        ? $isFocused
                          ? `${Style.darkTheme.selectInput.background} !important`
                          : `${Style.lightTheme.selectInput.focus.borderColor} !important`
                        : `${Style.lightTheme.selectInput.focus.borderColor} !important`,
                  })
              }
          }
      }
    
    },
  }
}
/**
 * 
 * @param currentTheme 
 * @returns Text Input style
 */
const textInputStyle = (currentTheme: string) => {
  return {
    Root: {
      style: ({$isFocused}: Input) => ({
        border:
        currentTheme === Strings.light
          ? $isFocused
            ? `${Style.darkTheme.selectInput.background} !important`
            : `${Style.lightTheme.selectInput.focus.borderColor} !important`
          : `${Style.lightTheme.selectInput.focus.borderColor} !important`,
      borderColor:
        currentTheme === Strings.light
          ? $isFocused
            ? `${Style.darkTheme.selectInput.background} !important`
            : `${Style.lightTheme.selectInput.focus.borderColor} !important`
          : `${Style.lightTheme.selectInput.focus.borderColor} !important`,
      }),
    },
    InputContainer: {
      style: () => ({
        fontWeight: Style.defaultFontWeight,
        transition: 'all .2s ease',
      }),
    },
    Input: {
      style: ({$isFocused}: Input) => ({
        backgroundColor:
          currentTheme === Strings.light
            ? $isFocused
              ? Style.lightTheme.selectInput.focus.background
              : Style.lightTheme.selectInput.background
            : $isFocused
            ? Style.darkTheme.selectInput.focus.background
            : Style.darkTheme.selectInput.background,
            color: Style.lightTheme.selectInput.color,
      }),
    },
  }
}
/**
 * 
 * @param currentTheme 
 * @returns Filter input style
 */
const filterInputStyle = (currentTheme: string) => {
  return {
    ControlContainer: {
        style: ({$isFocused}: {$isFocused: boolean}) => ({
          color: Style.lightTheme.selectInput.color,
          backgroundColor:
            currentTheme === Strings.light
              ? $isFocused
                ? Style.lightTheme.selectInput.focus.background
                : Style.lightTheme.selectInput.background
              : $isFocused
              ? Style.darkTheme.selectInput.focus.background
              : Style.darkTheme.selectInput.background,
          boxShadow: '0px',
          border:
            currentTheme === Strings.light
              ? $isFocused
                ? `${Style.darkTheme.selectInput.background} !important`
                : `${Style.lightTheme.selectInput.focus.borderColor} !important`
              : `${Style.lightTheme.selectInput.focus.borderColor} !important`,
          transition: 'color .2s ease',
          borderColor:
            currentTheme === Strings.light
              ? $isFocused
                ? `${Style.darkTheme.selectInput.background} !important`
                : `${Style.lightTheme.selectInput.focus.borderColor} !important`
              : `${Style.lightTheme.selectInput.focus.borderColor} !important`,
            width: Style.lightTheme.filterSelectInput.width,
        }),
      },
      SingleValue: {
        style: () => ({
          color: Style.lightTheme.selectInput.color,
        }),
      },
      Dropdown: {},
      OptionContent: {
        style: ({$isHighlighted, $selected}: Input) => {
          return {
            color: $selected || $isHighlighted ? Style.lightTheme.selectInput.optionColor : '',
            width: '100%',
            fontFamily: Style.lightTheme.selectInput.dropDownOption.fontFamily,
            fontWeight: 'normal',
          }
        },
      },
      Input: {
        style: () => {
          return {
            color: Style.lightTheme.selectInput.color,
          }
        },
      },
      Tag: {
        props: {
          overrides: {
            Root: {
              style: () => ({
                backgroundColor: Style.darkTheme.tag.color,
              }),
            },
          },
        },
      },
  }
}

/**
 *
 * @param currentTheme
 * @returns Select Input style
 */
const selectInputStyle = (currentTheme: string) => {
  return {
    ControlContainer: {
      style: ({$isFocused}: {$isFocused: boolean}) => ({
        color: Style.lightTheme.selectInput.color,
        backgroundColor:
          currentTheme === Strings.light
            ? $isFocused
              ? Style.lightTheme.selectInput.focus.background
              : Style.lightTheme.selectInput.background
            : $isFocused
            ? Style.darkTheme.selectInput.focus.background
            : Style.darkTheme.selectInput.background,
        boxShadow: '0px',
        border:
          currentTheme === Strings.light
            ? $isFocused
              ? `${Style.darkTheme.selectInput.background} !important`
              : `${Style.lightTheme.selectInput.focus.borderColor} !important`
            : `${Style.lightTheme.selectInput.focus.borderColor} !important`,
        transition: 'color .2s ease',
        borderColor:
          currentTheme === Strings.light
            ? $isFocused
              ? `${Style.darkTheme.selectInput.background} !important`
              : `${Style.lightTheme.selectInput.focus.borderColor} !important`
            : `${Style.lightTheme.selectInput.focus.borderColor} !important`,
      }),
    },
    SingleValue: {
      style: () => ({
        color: Style.lightTheme.selectInput.color,
      }),
    },
    Dropdown: {},
    OptionContent: {
      style: ({$isHighlighted, $selected}: Input) => {
        return {
          color: $selected || $isHighlighted ? Style.lightTheme.selectInput.optionColor : '',
          width: '100%',
          fontFamily: Style.lightTheme.selectInput.dropDownOption.fontFamily,
          fontWeight: 'normal',
        }
      },
    },
    Input: {
      style: () => {
        return {
          color: Style.lightTheme.selectInput.color,
        }
      },
    },
    Tag: {
      props: {
        overrides: {
          Root: {
            style: () => ({
              backgroundColor: Style.darkTheme.tag.color,
            }),
          },
        },
      },
    },
  }
}
/**
 *
 * @param currentTheme
 * @returns Text area style
 */

const textArea = (currentTheme: string) => {
  return {
    Root: {
      style: ({$isFocused, $isReadOnly}: Input) => ({
        border:
          currentTheme === Strings.light
            ? $isFocused
              ? `${Style.darkTheme.selectInput.background} !important`
              : `${Style.lightTheme.selectInput.focus.borderColor} !important`
            : `${Style.lightTheme.selectInput.focus.borderColor} !important`,
        transition: 'color .2s ease',
        borderColor:
          currentTheme === Strings.light
            ? $isFocused
              ? `${Style.darkTheme.selectInput.background} !important`
              : `${Style.lightTheme.selectInput.focus.borderColor} !important`
            : `${Style.lightTheme.selectInput.focus.borderColor} !important`,
      }),
    },
    InputContainer: {
      style: () => ({
        fontWeight: Style.defaultFontWeight,
        transition: 'all .2s ease',
      }),
    },
    Input: {
      style: ({$isReadOnly, $isFocused}: Input) => ({
        backgroundColor:
          currentTheme === Strings.light
            ? $isFocused
              ? Style.lightTheme.selectInput.focus.background
              : Style.lightTheme.selectInput.background
            : $isFocused
            ? Style.darkTheme.selectInput.focus.background
            : Style.darkTheme.selectInput.background,
        boxShadow: '0px',
        color: Style.lightTheme.selectInput.color,
        border:
          currentTheme === Strings.light
            ? $isFocused
              ? `${Style.darkTheme.selectInput.background} !important`
              : `${Style.lightTheme.selectInput.focus.borderColor} !important`
            : `${Style.lightTheme.selectInput.focus.borderColor} !important`,
        transition: 'color .2s ease',
        borderColor:
          currentTheme === Strings.light
            ? $isFocused
              ? `${Style.darkTheme.selectInput.background} !important`
              : `${Style.lightTheme.selectInput.focus.borderColor} !important`
            : `${Style.lightTheme.selectInput.focus.borderColor} !important`,
      }),
    },
  }
}

/**
 *
 * @param currentTheme
 * @returns Base UI Pagination page size
 */

const baseUIPaginationSizeStyle = (currentTheme: string) => {
  return {
    ControlContainer: {
      style: ({$isFocused}: Input) => ({
        backgroundColor:
          currentTheme === Strings.light
            ? $isFocused
              ? Style.lightTheme.selectInput.focus.background
              : Style.lightTheme.selectInput.background
            : $isFocused
            ? Style.darkTheme.selectInput.focus.background
            : Style.darkTheme.selectInput.optionContainerBackgroundColor,
        boxShadow: '0px',
        border:
          currentTheme === Strings.light
            ? $isFocused
              ? `${Style.darkTheme.selectInput.background} !important`
              : `${Style.lightTheme.selectInput.focus.borderColor} !important`
            : `${Style.lightTheme.selectInput.focus.borderColor} !important`,
        transition: 'color .2s ease',
        borderColor:
          currentTheme === Strings.light
            ? $isFocused
              ? `${Style.darkTheme.selectInput.background} !important`
              : `${Style.lightTheme.selectInput.focus.borderColor} !important`
            : `${Style.lightTheme.selectInput.focus.borderColor} !important`,
        width: Style.lightTheme.selectInput.rootWidth,
        height: Style.lightTheme.selectInput.rootHeight,
        
      }),
    },
    Root: {
      style: ({$isFocused}: Input) => ({
        width: Style.lightTheme.selectInput.rootWidth,
        height: Style.lightTheme.selectInput.rootHeight,
        backgroundColor:
          currentTheme === Strings.light
            ? $isFocused
              ? Style.lightTheme.selectInput.focus.background
              : Style.lightTheme.selectInput.background
            : $isFocused
            ? Style.darkTheme.selectInput.focus.background
            : Style.darkTheme.selectInput.optionContainerBackgroundColor,
      }),
    },
    Dropdown: {
      style: ({$isFocused}: Input) => ({
        backgroundColor:
          currentTheme === Strings.light
            ? $isFocused
              ? Style.lightTheme.selectInput.focus.background
              : Style.lightTheme.selectInput.background
            : $isFocused
            ? Style.darkTheme.selectInput.focus.background
            : Style.darkTheme.selectInput.background,
        width: Style.darkTheme.selectInput.pagination.width,
        overflow: 'hidden',
      }),
    },
    OptionContent: {
      style: ({$isHighlighted, $isFocused}: Input) => {
        return {
          width: Style.darkTheme.selectInput.pagination.width,
          color: $isFocused || $isHighlighted ? Style.darkTheme.selectInput.pagination.focus.color : Style.darkTheme.selectInput.singleValueColor
        }
      },
    },
    SingleValue: {
      style: ({$isHighlighted, $selected, $isFocused}: Input) => {
        return {
          color:
            $selected || $isHighlighted || $isFocused
              ? Style.darkTheme.selectInput.optionColor
              : Style.darkTheme.selectInput.singleValueColor,
        }
      },
    },
  }
}

/**
 *
 * @param currentTheme
 * @returns Base UI Pagination change page no style
 */

const paginationPageStyle = (currentTheme: string) => {
  return {
    Select: {
      props: {
        overrides: {
          Root: {
            style: () => ({
              outline: 'none',
            }),
          },
          ControlContainer: {
            style: ({$isFocused}: Input) => ({
              outline: '0px',
              color:
                currentTheme === Strings.light
                  ? Style.lightTheme.selectInput.color
                  : $isFocused
                  ? Style.darkTheme.selectInput.pagination.focus.color
                  : Style.darkTheme.selectInput.pagination.color,
              backgroundColor:
                currentTheme === Strings.light
                  ? Style.lightTheme.selectInput.background
                  : $isFocused
                  ? Style.darkTheme.selectInput.focus.background
                  : Style.darkTheme.selectInput.background,
              boxShadow: '0px',
              border:
                currentTheme === Strings.light
                  ? $isFocused
                    ? `${Style.darkTheme.selectInput.background} !important`
                    : `${Style.lightTheme.selectInput.focus.borderColor} !important`
                  : `${Style.lightTheme.selectInput.focus.borderColor} !important`,
            }),
          },
          OptionContent: {
            style: ({ $isFocused, $isHighlighted}: Input) => ({
              color: $isFocused || $isHighlighted ? Style.darkTheme.selectInput.pagination.focus.color : Style.darkTheme.selectInput.singleValueColor
            }),
          },
        },
      },
    },
    MaxLabel: {
      style: ({$isFocused}: Input) => ({
        outline: '0px',
        color:"#94949F",
      }),
    },
    NextButton: {
      style: ({$isHighlighted}: Input) => ({
        backgroundColor:
          currentTheme === Strings.light
            ? Style.lightTheme.selectInput.pagination.nextButton.backgroundColor
            : $isHighlighted
            ? Style.darkTheme.selectInput.focus.background
            : Style.lightTheme.selectInput.pagination.nextButton.backgroundColor,
        color: Style.darkTheme.selectInput.pagination.color,
        paddingLeft: "0px",
        paddingRight: "0px"
      }),
    },
    PrevButton: {
      style: ({$isHighlighted}: Input) => ({
        backgroundColor:
          currentTheme === Strings.light
            ? Style.lightTheme.selectInput.pagination.nextButton.backgroundColor
            : $isHighlighted
            ? Style.darkTheme.selectInput.focus.background
            : Style.lightTheme.selectInput.pagination.nextButton.backgroundColor,
        color: Style.darkTheme.selectInput.pagination.color,
        paddingLeft: "0px",
        paddingRight: "0px"
      }),
    },
    DropdownContainer: {
      style: ({$isFocused}: Input) => ({
        outline: '0px',
        color: Style.darkTheme.selectInput.pagination.color,
        overflow: 'hidden',
        marginRight: "0px",
        backgroundColor:
          currentTheme === Strings.light
            ? Style.lightTheme.selectInput.background
            : $isFocused
            ? Style.darkTheme.selectInput.focus.background
            : Style.darkTheme.selectInput.background,
        boxShadow: '0px',
      }),
    },
  }
}

/**
 *
 * @param theme
 * @param tag ["select", "textarea", "input", "filterInput"]
 * @returns the style object base on the tags
 */
export const allInputsStyles = (theme: string, tag: string) => {
  // if (tag === TEXT_AREA_KEY) {
  //   return textArea(theme)
  // } else if (tag === INPUT_KEY) {
  //   return textInputStyle(theme)
  // } else if (tag === SELECT_INPUT_KEY) {
  //   return selectInputStyle(theme)
  // } else if (tag === PAGINATION_CHANGE_SIZE_KEY) {
  //   return baseUIPaginationSizeStyle(theme)
  // } else if (tag === PAGINATION_CHANGE_PAGE_KEY) {
  //   return paginationPageStyle(theme)
  // } else if (tag === FILTER_SELECT_INPUT) {
  //   return filterInputStyle(theme)
  // }else if (tag === TIMER_PICKER_INPUT) {
  //   return timePickerStyle(theme)
  // }
  // else {
    return {}
  // }
}
