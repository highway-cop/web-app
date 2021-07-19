import type { Emitter } from 'mitt';

import Service from "~/modules/api-service";

declare module '@vue/runtime-core' {

    interface ComponentCustomProperties {

        readonly $events: Emitter<Record<string, any>>;

        readonly $service: Service;

        $overlay(value: boolean): void;

    }

}

declare global {

    interface Window {

        flutter_inappwebview?: any;

    }

}
