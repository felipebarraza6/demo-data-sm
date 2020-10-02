import * as React from 'react';
import IRLiteChart from '../typed/IRLiteChart';
export default class LiteChart extends React.Component<IRLiteChart, any> {
    chart: any;
    elm: any;
    container: any;
    config: object;
    displayName: string;
    constructor(props: IRLiteChart);
    combineChartConfig(props: IRLiteChart, config: any): any;
    combineViewConfig(props: IRLiteChart, config: any): any;
    combineSeriesConfig(props: IRLiteChart, config: any): any;
    createChartInstance(config: any): void;
    repaintChartInstance(config: any): void;
    clearConfigData(): void;
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    portalRef: (container: any) => void;
    render(): JSX.Element;
}
