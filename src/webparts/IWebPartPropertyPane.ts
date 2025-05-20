/* eslint-disable @typescript-eslint/no-explicit-any */
import { IPropertyPaneConfiguration } from "@microsoft/sp-property-pane";

export interface IWebPartPropertyPane {
  // render(): React.ReactElement;
  getPropertyPaneConfiguration(): IPropertyPaneConfiguration
  onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void;
  onPropertyPaneConfigurationStart(): void;
  onPropertyPaneConfigurationComplete(): void;
  isConfigured(): boolean;
  configurationErrors(): string[];
}
