// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface ITheme {
    textColor: string;
    bgColor: string;
    accentColor: string;
  }
}
