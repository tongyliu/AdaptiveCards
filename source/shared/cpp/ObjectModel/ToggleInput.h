#pragma once

#include "pch.h"
#include "BaseInputElement.h"
#include "Enums.h"
#include "CustomParser.h"

namespace AdaptiveCards
{
class ToggleInput : public BaseInputElement
{
public:
    ToggleInput();

    virtual std::string Serialize();
    Json::Value SerializeToJsonValue();

    std::string GetTitle() const;
    void SetTitle(const std::string value);

    std::string GetValue() const;
    void SetValue(const std::string value);

    std::string GetValueOff() const;
    void SetValueOff(const std::string value);

    std::string GetValueOn() const;
    void SetValueOn(const std::string value);

private:
    std::string m_title;
    std::string m_value;
    std::string m_valueOff;
    std::string m_valueOn;
};

class ToggleInputParser : public ICustomParser
{
public:
    std::shared_ptr<BaseCardElement> Deserialize(const Json::Value& root);
    std::shared_ptr<BaseCardElement> DeserializeFromString(const std::string& jsonString);
};
}