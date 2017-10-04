#pragma once

#include "pch.h"
#include "BaseActionElement.h"
#include "BaseCardElement.h"
#include "Enums.h"
#include "CustomParser.h"

namespace AdaptiveCards
{
class Image : public BaseCardElement
{
public:
    Image();
    Image(
        Spacing spacing,
        bool separator,
        std::string uri,
        ImageStyle imageStyle,
        ImageSize imageSize,
        std::string altText,
        HorizontalAlignment hAlignment);

    virtual std::string Serialize();
    virtual Json::Value SerializeToJsonValue();

    std::string GetUrl() const;
    void SetUrl(const std::string value);

    ImageStyle GetImageStyle() const;
    void SetImageStyle(const ImageStyle value);

    ImageSize GetImageSize() const;
    void SetImageSize(const ImageSize value);

    std::string GetAltText() const;
    void SetAltText(const std::string value);

    HorizontalAlignment GetHorizontalAlignment() const;
    void SetHorizontalAlignment(const HorizontalAlignment value);

    std::shared_ptr<BaseActionElement> GetSelectAction() const;
    void SetSelectAction(const std::shared_ptr<BaseActionElement> action);

private:
    std::string m_url;
    ImageStyle m_imageStyle;
    ImageSize m_imageSize;
    std::string m_altText;
    HorizontalAlignment m_hAlignment;
    std::shared_ptr<BaseActionElement> m_selectAction;
};

class ImageParser : public ICustomParser
{
public:
    std::shared_ptr<BaseCardElement> Deserialize(const Json::Value& root);
    std::shared_ptr<BaseCardElement> DeserializeWithoutCheckingType(const Json::Value& root);
    std::shared_ptr<BaseCardElement> DeserializeFromString(const std::string& jsonString);
};
}
