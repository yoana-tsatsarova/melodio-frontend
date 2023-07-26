declare module '@maplibre/maplibre-gl-style-spec/src/deref' {
    import { LayerSpecification } from '@maplibre/maplibre-gl-style-spec/types/style-spec';
    function deref(layer: LayerSpecification, parent: any): any;
    export = deref;
}
