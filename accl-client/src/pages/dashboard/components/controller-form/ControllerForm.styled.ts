import styled from 'styled-components'

export const StyledControllerForm = styled.section`
  width: 100%;
  height: 100%;
  padding: 1rem;

  > section.plot {
    height: 50%;
    width: 100%;
    border: 1px #e0e0e0 solid;
    border-radius: 4px 4px 0 0;
    box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
      0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
  }

  > section.form {
    > div.MuiTableContainer-root {
      border-top: none;
      border-radius: 0 0 4px 4px;

      table {
        th {
          font-weight: 900;
        }

        td.align-top {
          vertical-align: top;
        }

        div.MuiTextField-root {
          width: 100%;
        }

        button {
          aspect-ratio: 1;
          padding: 0.5rem;

          &.add {
            background-color: gray;
            color: white;
          }
        }
      }
    }
  }
`
