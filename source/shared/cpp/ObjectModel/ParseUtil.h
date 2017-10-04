#pragma once

#include "pch.h"
#include "AdaptiveCardParseException.h"
#include "Enums.h"
#include "json/json.h"
#include "CustomParser.h"

namespace AdaptiveCards
{
class BaseCardElement;
class BaseActionElement;

class ParseUtil
{

public:

    static void ThrowIfNotJsonObject(const Json::Value& json);

    static void ExpectString(const Json::Value& json);

    static std::string GetTypeAsString(const Json::Value& json);

    static std::string TryGetTypeAsString(const Json::Value& json);

    static std::string GetString(const Json::Value& json, AdaptiveCardSchemaKey key, bool isRequired = false);

    // Gets the specified property and returns a JSON string of the value
    static std::string GetJsonString(const Json::Value& json, AdaptiveCardSchemaKey key, bool isRequired = false);

    static std::string GetValueAsString(const Json::Value& json, AdaptiveCardSchemaKey key, bool isRequired = false);

    static bool GetBool(const Json::Value& json, AdaptiveCardSchemaKey key, bool defaultValue, bool isRequired = false);

    static unsigned int GetUInt(const Json::Value& json, AdaptiveCardSchemaKey key, unsigned int defaultValue, bool isRequired = false);

    static int GetInt(const Json::Value& json, AdaptiveCardSchemaKey key, int defaultValue, bool isRequired = false);

    static CardElementType GetCardElementType(const Json::Value& json);

    static CardElementType TryGetCardElementType(const Json::Value& json);

    static ActionType GetActionType(const Json::Value& json);

    static ActionType TryGetActionType(const Json::Value& json);

    static Json::Value GetArray(const Json::Value& json, AdaptiveCardSchemaKey key, bool isRequired = false);

    static Json::Value GetJsonValueFromString(const std::string jsonString);

    static Json::Value ExtractJsonValue(const Json::Value& jsonRoot, AdaptiveCardSchemaKey key, bool isRequired = false);

    template <typename T>
    static T GetEnumValue(
        const Json::Value& json,
        AdaptiveCardSchemaKey key,
        T defaultEnumValue,
        std::function<T(const std::string& name)> enumConverter,
        bool isRequired = false);

    static std::vector<std::shared_ptr<BaseCardElement>> GetElementCollection(
        const Json::Value& json,
        AdaptiveCardSchemaKey key,
        bool isRequired = false);

    template <typename T>
    static std::vector<std::shared_ptr<T>> GetElementCollectionOfSingleType(
        const Json::Value& json,
        AdaptiveCardSchemaKey key,
        std::shared_ptr<ICustomParser> parser,
        bool isRequired = false);

    static std::vector<std::shared_ptr<BaseActionElement>> GetActionCollection(
        const Json::Value& json,
        AdaptiveCardSchemaKey key,
        bool isRequired = false);

    template <typename T>
    static T ExtractJsonValueAndMergeWithDefault(
        const Json::Value& rootJson,
        AdaptiveCardSchemaKey key,
        const T &defaultValue,
        const std::function<T(const Json::Value&, const T&)>& deserializer);

    static std::shared_ptr<BaseActionElement> GetActionFromJsonValue(
        const Json::Value& json);

    static void ExpectTypeString(const Json::Value& json, CardElementType bodyType);

    // throws if the key is missing or the value mapped to the key is the wrong type
    static void ExpectKeyAndValueType(const Json::Value& json, const char* expectedKey, std::function<void(const Json::Value&)> throwIfWrongType);

    static std::string ToLowercase(const std::string value);

private:
    ParseUtil();
    ~ParseUtil();

};

template <typename T>
T ParseUtil::GetEnumValue(const Json::Value& json, AdaptiveCardSchemaKey key, T defaultEnumValue, std::function<T(const std::string& name)> enumConverter, bool isRequired)
{
    std::string propertyValueStr = "";
    try
    {
        const std::string propertyName = AdaptiveCardSchemaKeyToString(key);
        auto propertyValue = json.get(propertyName, Json::Value());
        if (propertyValue.empty())
        {
            if (isRequired)
            {
                throw AdaptiveCardParseException("Property is required but was found empty: " + propertyName);
            }
            else
            {
                return defaultEnumValue;
            }
        }

        if (!propertyValue.isString())
        {
            throw AdaptiveCardParseException("Enum type was invalid. Expected type string.");
        }

        propertyValueStr = propertyValue.asString();
        return enumConverter(propertyValueStr);
    }
    catch (const std::out_of_range&)
    {
        throw AdaptiveCardParseException("Enum type was out of range. Actual: " + propertyValueStr);
    }
}

template <typename T>
std::vector<std::shared_ptr<T>> ParseUtil::GetElementCollectionOfSingleType(
    const Json::Value& json,
    AdaptiveCardSchemaKey key,
    std::shared_ptr<ICustomParser> parser,
    bool isRequired)
{
    auto elementArray = GetArray(json, key, isRequired);

    std::vector<std::shared_ptr<T>> elements;
    if (elementArray.empty())
    {
        return elements;
    }

    elements.reserve(elementArray.size());

    // Deserialize every element in the array
    for (const Json::Value& curJsonValue : elementArray)
    {
        // Parse the element
        auto el = parser->Deserialize(curJsonValue);
        if (el != nullptr)
        {
            elements.push_back(el);
        }
    }

    return elements;
}

template <typename T>
T ParseUtil::ExtractJsonValueAndMergeWithDefault(
    const Json::Value& rootJson,
    AdaptiveCardSchemaKey key,
    const T& defaultValue,
    const std::function<T(const Json::Value&, const T&)>& deserializer)
{
    auto jsonObject = ParseUtil::ExtractJsonValue(rootJson, key);
    T result = jsonObject.empty() ? defaultValue : deserializer(jsonObject, defaultValue);
    return result;
}
}
