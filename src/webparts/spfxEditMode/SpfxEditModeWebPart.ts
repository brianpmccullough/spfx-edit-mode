/* eslint-disable @microsoft/spfx/pair-react-dom-render-unmount */
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { DisplayMode, Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'SpfxEditModeWebPartStrings';
import SpfxEditMode from './components/SpfxEditMode';
import { ISpfxEditModeProps } from './components/ISpfxEditModeProps';
import { IWebPartPropertyPane } from '../IWebPartPropertyPane';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';

export interface ISpfxEditModeWebPartProps {
  description: string;
}

export default class SpfxEditModeWebPart extends BaseClientSideWebPart<ISpfxEditModeWebPartProps> {
  private propertyPane?: IWebPartPropertyPane;
  private _isDarkTheme: boolean = false;
  
  protected async onInit(): Promise<void> {
    if (this.displayMode === DisplayMode.Edit) {
      const { SpfxEditModeWebPartPropertyPane: SpfxEditModeWebPartPropertyPane } = await import(/* webpackChunkName: 'SpfxEditModeWebPartPropertyPane' */ './SpfxEditModeWebPartPropertyPane');
      this.propertyPane = new SpfxEditModeWebPartPropertyPane(
        () => this.properties, // expose the web part properties to the EditMode component as a getter
        // (key, value) => { (this.properties as any)[key] = value; },
      );

    }
  }

  public render(): void {
    console.log(strings);

    const element: React.ReactElement<ISpfxEditModeProps> = React.createElement(
      SpfxEditMode,
      {
        description: this.properties.description,
        isDarkTheme: this._isDarkTheme,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }

  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return this.propertyPane?.getPropertyPaneConfiguration() || { pages: [] };
  }
}
