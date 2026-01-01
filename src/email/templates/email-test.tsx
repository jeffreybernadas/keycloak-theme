import i18n, { type TFunction } from "i18next";
import { render, Text } from "jsx-email";
import type { GetSubject, GetTemplate, GetTemplateProps } from "keycloakify-emails";
import { createVariablesHelper } from "keycloakify-emails/variables";
import { defaultEmailBranding } from "../config/branding.config";
import { EmailLayout } from "../layout";
import { previewLocale } from "../utils/previewLocale";
import { applyRTL } from "../utils/RTL";

type TemplateProps = Omit<GetTemplateProps, "plainText"> & { t: TFunction };

const paragraph = {
    lineHeight: 1.5,
    fontSize: 14
};

const rtlStyle = {
    direction: "rtl" as const,
    textAlign: "right" as const
};

export const previewProps: TemplateProps = {
    t: i18n.getFixedT(previewLocale),
    locale: previewLocale,
    themeName: "vanilla"
};

export const templateName = "Email Test";

const { exp } = createVariablesHelper("email-test.ftl");

export const Template = ({ locale, t }: TemplateProps) => {
    const isRTL = locale === "ar";

    return (
        <EmailLayout preview={t("email-test.subject")} locale={locale}>
            <Text style={applyRTL(paragraph, isRTL, rtlStyle)}>
                {t("email-test.greeting", { firstName: exp("user.firstName") })},
            </Text>
            <Text style={applyRTL(paragraph, isRTL, rtlStyle)}>
                {t("email-test.message", { brandName: defaultEmailBranding.name })}
            </Text>
            <Text style={applyRTL(paragraph, isRTL, rtlStyle)}>
                {t("email-test.thanks")}
                <br />
                {defaultEmailBranding.name}
            </Text>
        </EmailLayout>
    );
};

export const getTemplate: GetTemplate = async props => {
    const t = i18n.getFixedT(props.locale);
    return await render(<Template {...props} t={t} />, { plainText: props.plainText });
};

export const getSubject: GetSubject = async props => {
    const t = i18n.getFixedT(props.locale);
    return t("email-test.subject");
};
