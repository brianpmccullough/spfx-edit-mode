/* eslint-disable @typescript-eslint/no-explicit-any */
import { IWebPartPropertyPane } from "../IWebPartPropertyPane";
import * as strings from "SpfxEditModeWebPartStrings";
import { IPropertyPaneConfiguration, PropertyPaneTextField } from "@microsoft/sp-property-pane";
import { ISpfxEditModeWebPartProps } from "./SpfxEditModeWebPart";

export class SpfxEditModeWebPartPropertyPane implements IWebPartPropertyPane {
  constructor(    

    //TODO: incorporate the ISpfxEditModeWebPartProps
    private properties: () => ISpfxEditModeWebPartProps,  // getter
    // private setProperty: (key: string, value: any) => void,  // setter
) {}

  getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }

  public onPropertyPaneFieldChanged(
    propertyPath: string,
    oldValue: any,
    newValue: any
  ): void {
    // Handle property pane field changes
    console.log(this.properties());
  }

  public onPropertyPaneConfigurationStart(): void {
    // Logic to execute when property pane configuration starts
  }

  public onPropertyPaneConfigurationComplete(): void {
    // Logic to execute when property pane configuration completes
  }

  public isConfigured(): boolean {
    return this.configurationErrors().length === 0;
  }

  public configurationErrors(): string[] {
    // Logic to return any configuration errors
    return [];
  }
}
