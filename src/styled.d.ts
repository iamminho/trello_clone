// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface ITheme {
    bgColor: string;
    cardColor: string;
    boardColor: string;
  }
}
