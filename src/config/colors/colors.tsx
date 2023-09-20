const Style = {
  defaultFontWeight: 500,
  lightTheme: {
    selectInput: {
      rootWidth: "80px",
      rootHeight: "48px",
      background: 'rgb(249, 249, 249)',
      borderColor: 'transparent',
      dropDown: '#f9f9f9',
      color: '#5E6278',
      optionColor: '#009ef7',
      focus: {
        background: '#F4F4F4',
        borderColor: 'transparent',
        color:"#282840",
      },
      pagination: {
        nextButton: {
          backgroundColor: "transparent",
          focus: {
            background: "rgb(249, 249, 249)"
          }
        }
      },
      hover: {
        optionColor: '#009ef7',
      },
      dropDownOption: {
        boxShadow: '0px 0px 50px 0px rgba(82, 63, 105, 0.15)',
        borderRadius: '0.475rem',
        padding: '1rem 0',
        fontFamily: 'system-ui, Helvetica Neue, Helvetica, Arial, sans-serif',
        backgroundColor: '#1E1E2D',
      },
    },
    filterSelectInput: {
      width: '150px',
      height: '34px',
      fontFamily: 'system-ui, Helvetica Neue, Helvetica, Arial, sans-serif',
    },
    tag: {
      color: '#a7a7a7',
    },
    checkBox: {
        background: 'transparent',
        checked: {
          background: 'rgb(0, 158, 247)',
          border: 'rgb(0, 158, 247)',
        },
      }
  },
  darkTheme: {
    selectInput: {
      background: '#1b1b29',
      borderColor: '#1b1b29',
      optionColor: '#009ef7',
      pagination: {
        selectInputWidth: '72.25px',
        color: "#94949F",
        borderColor: '#323248',
        width: '70px',
        focus: {
          color: "rgb(222 222 232)"
        }
      },
      dropDown: '#f9f9f9',
      dropdownWidth: "100%",
      focus: {
        background: '#2B2B40',
        borderColor: '#1b1b29',
      },
      dropDownOption: {
        boxShadow: '0px 0px 50px 0px rgba(82, 63, 105, 0.15)',
        borderRadius: '0.475rem',
        padding: '1rem 0',
        backgroundColor: '#1E1E2D',
      },
      hover: {
        optionColor: '#009ef7',
      },
      singleValueColor: "rgb(146, 146, 159)",
      optionContainerBackgroundColor: "#1b1b29"
    },
    checkBox: {
      background: 'rgb(43, 43, 64)',
      checked: {
        background: 'rgb(0, 158, 247)',
        border: 'transparent',
        borderRadius: "5px"
      },
    },
    tag: {
      color: '#a7a7a7',
    },
  },
  colorPicker: "rgb(255, 255, 255)",
  sweetAlert: {
    cancelButtonColor: "#3085d6",
    confirmDeleteButtonColor: "#d33",
    successMessageColor: "#3085d6"
  },
  bootstrapClassColor: {
    primary: "primary",
    secondary: "secondary",
    dark: 'dark',
    danger: 'danger',
    info: 'info',
    success:'success',
    light: 'light',
    warning: "warning"
  },
  attendanceCalendarBackground: {
    fullDay: 'rgb(92, 184, 92)',
    halfDay: 'rgb(240, 173, 78)',
    earlyLeave: "rgb(91, 192, 222)",
    absent: "rgb(217, 83, 79)",
    holidayColor: "rgb(255, 179, 209)"
  }
}
export default Style
