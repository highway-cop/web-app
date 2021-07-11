import Service from "~/modules/api-service";

declare module '@vue/runtime-core' {

    interface ComponentCustomProperties {

        readonly $service: Service;

    }

}
