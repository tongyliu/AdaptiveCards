#include "ParseUtil.h"
#include "AdaptiveCardParseException.h"
#include "ElementParserRegistration.h"
#include "ActionParserRegistration.h"

namespace AdaptiveCards
{

void ParseUtil::ThrowIfNotJsonObject(const Json::Value& json)
{
    if (!json.isObject()) {
        throw AdaptiveCardParseException("Expected JSON Object\n");
    }
}

void ParseUtil::ExpectString(const Json::Value& json)
{
    if (!json.isString())
    {
        throw AdaptiveCardParseException("The JSON element did not have the expected type 'string'");
    }
}

// TODO: Remove? This code path might not be desirable going forward depending on how we decide to support forward compat. Task 10893205
std::string ParseUtil::GetTypeAsString(const Json::Value& json)
{
    std::string typeKey = "type";
    if (!json.isMember(typeKey))
    {
        throw AdaptiveCardParseException("The JSON element is missing the following value: " + typeKey);
    }

    return json.get(typeKey, Json::Value()).asString();
}

std::string ParseUtil::TryGetTypeAsString(const Json::Value& json)
{
    try
    {
        return GetTypeAsString(json);
    }
    catch (const AdaptiveCardParseException&)
    {
        return "";
    }

}

std::string ParseUtil::GetString(const Json::Value& json, AdaptiveCardSchemaKey key, bool isRequired)
{
    std::string propertyName = AdaptiveCardSchemaKeyToString(key);
    auto propertyValue = json.get(propertyName, Json::Value());
    if (propertyValue.empty())
    {
        if (isRequired)
        {
            throw AdaptiveCardParseException("Property is required but was found empty: " + propertyName);
        }
        else
        {
            return "";
        }
    }

    if (!propertyValue.isString())
    {
        throw AdaptiveCardParseException("Value was invalid. Expected type string.");
    }

    return propertyValue.asString();
}

std::string ParseUtil::GetJsonString(const Json::Value& json, AdaptiveCardSchemaKey key, bool isRequired)
{
    std::string propertyName = AdaptiveCardSchemaKeyToString(key);
    auto propertyValue = json.get(propertyName, Json::Value());
    if (propertyValue.empty())
    {
        if (isRequired)
        {
            throw AdaptiveCardParseException("Property is required but was found empty: " + propertyName);
        }
        else
        {
            return "";
        }
    }

    return propertyValue.toStyledString();
}

std::string ParseUtil::GetValueAsString(const Json::Value& json, AdaptiveCardSchemaKey key, bool isRequired)
{
    std::string propertyName = AdaptiveCardSchemaKeyToString(key);
    auto propertyValue = json.get(propertyName, Json::Value());
    if (propertyValue.empty())
    {
        if (isRequired)
        {
            throw AdaptiveCardParseException("Property is required but was found empty: " + propertyName);
        }
        else
        {
            return "";
        }
    }

    return propertyValue.asString();
}

bool ParseUtil::GetBool(const Json::Value& json, AdaptiveCardSchemaKey key, bool defaultValue, bool isRequired)
{
    std::string propertyName = AdaptiveCardSchemaKeyToString(key);
    auto propertyValue = json.get(propertyName, Json::Value());
    if (propertyValue.empty())
    {
        if (isRequired)
        {
            throw AdaptiveCardParseException("Property is required but was found empty: " + propertyName);
        }
        else
        {
            return defaultValue;
        }
    }

    if (!propertyValue.isBool())
    {
        throw AdaptiveCardParseException("Value was invalid. Expected type bool.");
    }

    return propertyValue.asBool();
}

unsigned int ParseUtil::GetUInt(const Json::Value & json, AdaptiveCardSchemaKey key, unsigned int defaultValue, bool isRequired)
{
    std::string propertyName = AdaptiveCardSchemaKeyToString(key);
    auto propertyValue = json.get(propertyName, Json::Value());
    if (propertyValue.empty())
    {
        if (isRequired)
        {
            throw AdaptiveCardParseException("Property is required but was found empty: " + propertyName);
        }
        else
        {
            return defaultValue;
        }
    }

    if (!propertyValue.isUInt())
    {
        throw AdaptiveCardParseException("Value was invalid. Expected type uInt.");
    }

    return propertyValue.asUInt();
}

int ParseUtil::GetInt(const Json::Value & json, AdaptiveCardSchemaKey key, int defaultValue, bool isRequired)
{
    std::string propertyName = AdaptiveCardSchemaKeyToString(key);
    auto propertyValue = json.get(propertyName, Json::Value());
    if (propertyValue.empty())
    {
        if (isRequired)
        {
            throw AdaptiveCardParseException("Property is required but was found empty: " + propertyName);
        }
        else
        {
            return defaultValue;
        }
    }

    if (!propertyValue.isInt())
    {
        throw AdaptiveCardParseException("Value was invalid. Expected type int.");
    }

    return propertyValue.asInt();
}

void ParseUtil::ExpectTypeString(const Json::Value& json, CardElementType bodyType)
{
    std::string actualType = GetTypeAsString(json);
    std::string expectedTypeStr = CardElementTypeToString(bodyType);
    bool isTypeCorrect = expectedTypeStr.compare(actualType) == 0;
    if (!isTypeCorrect)
    {
        throw AdaptiveCardParseException("The JSON element did not have the correct type. Expected: " + expectedTypeStr + ", Actual: " + actualType);
    }
}

// throws if the key is missing or the value mapped to the key is the wrong type
void ParseUtil::ExpectKeyAndValueType(const Json::Value& json, const char* expectedKey, std::function<void(const Json::Value&)> throwIfWrongType)
{
    if (expectedKey == nullptr)
    {
        throw AdaptiveCardParseException("null expectedKey");
    }

    if (!json.isMember(expectedKey))
    {
        throw AdaptiveCardParseException("The JSON element is missing the following key: " + std::string(expectedKey));
    }

    auto value = json.get(expectedKey, Json::Value());
    throwIfWrongType(value);
}

CardElementType ParseUtil::GetCardElementType(const Json::Value& json)
{
    std::string actualType = GetTypeAsString(json);
    try
    {
        return CardElementTypeFromString(actualType);
    }
    catch (const std::out_of_range&)
    {
        throw AdaptiveCardParseException("Invalid CardElementType");
    }
}

CardElementType ParseUtil::TryGetCardElementType(const Json::Value& json)
{
    try
    {
        return GetCardElementType(json);
    }
    catch (const AdaptiveCardParseException&)
    {
        return CardElementType::Unsupported;
    }
}

ActionType ParseUtil::GetActionType(const Json::Value& json)
{
    std::string actualType = GetTypeAsString(json);
    try
    {
        return ActionTypeFromString(actualType);
    }
    catch (const std::out_of_range&)
    {
        throw AdaptiveCardParseException("Invalid ActionType");
    }
}

ActionType ParseUtil::TryGetActionType(const Json::Value& json)
{
    try
    {
        return GetActionType(json);
    }
    catch (const AdaptiveCardParseException&)
    {
        return ActionType::Unsupported;
    }
}

Json::Value ParseUtil::GetArray(
    const Json::Value& json,
    AdaptiveCardSchemaKey key,
    bool isRequired)
{
    std::string propertyName = AdaptiveCardSchemaKeyToString(key);
    auto elementArray = json.get(propertyName, Json::Value());
    if (isRequired && elementArray.empty())
    {
        throw AdaptiveCardParseException("Could not parse required key: " + propertyName + ". It was not found");
    }

    if (!elementArray.empty() && !elementArray.isArray())
    {
        throw AdaptiveCardParseException("Could not parse specified key: " + propertyName + ". It was not an array");
    }
    return elementArray;
}

Json::Value ParseUtil::GetJsonValueFromString(const std::string jsonString)
{
    Json::Reader reader;
    Json::Value jsonValue;
    if (!reader.parse(jsonString.c_str(), jsonValue))
    {
        throw AdaptiveCardParseException("Expected JSON Object\n");
    }
    return jsonValue;
}

Json::Value ParseUtil::ExtractJsonValue(const Json::Value& json, AdaptiveCardSchemaKey key, bool isRequired)
{
    std::string propertyName = AdaptiveCardSchemaKeyToString(key);
    auto propertyValue = json.get(propertyName, Json::Value());
    if (isRequired && propertyValue.empty())
    {
        throw AdaptiveCardParseException("Could not extract specified key: " + propertyName + ".");
    }
    return propertyValue;
}

std::string ParseUtil::ToLowercase(std::string value)
{
    std::transform(value.begin(), value.end(), value.begin(), [](char c) { return std::tolower(c); });
    return value;
}

std::vector<std::shared_ptr<BaseCardElement>> ParseUtil::GetElementCollection(
    const Json::Value& json,
    AdaptiveCardSchemaKey key,
    bool isRequired)
{
    auto elementArray = GetArray(json, key, isRequired);

    std::vector<std::shared_ptr<BaseCardElement>> elements;
    if (elementArray.empty())
    {
        return elements;
    }

    elements.reserve(elementArray.size());

    for (const auto& curJsonValue : elementArray)
    {
        // Get the element's type
        std::string typeString = GetTypeAsString(curJsonValue);

        std::function<std::shared_ptr<BaseCardElement>(const Json::Value&)> parserFunction;
        bool hasParser = ElementParserRegistration::GetParser(typeString, &parserFunction);

        //Parse it if it's allowed by the current parsers
        if (hasParser)
        {
            // Use the parser that maps to the type
            elements.push_back(parserFunction(curJsonValue));
        }
    }

    return elements;
}

std::shared_ptr<BaseActionElement> ParseUtil::GetActionFromJsonValue(
    const Json::Value& json)
{
    if (json.empty() || !json.isObject())
    {
        throw AdaptiveCardParseException("Expected a Json object to extract Action element");
    }

    // Get the element's type
    std::string typeString = GetTypeAsString(json);

    std::function<std::shared_ptr<BaseActionElement>(const Json::Value&)> parserFunction;
    bool hasParser = ActionParserRegistration::GetParser(typeString, &parserFunction);

    //Parse it if it's allowed by the current parsers
    if (hasParser)
    {
        // Use the parser that maps to the type
        return parserFunction(json);
    }

    return nullptr;
}

std::vector<std::shared_ptr<BaseActionElement>> ParseUtil::GetActionCollection(
    const Json::Value& json,
    AdaptiveCardSchemaKey key,
    bool isRequired)
{
    auto elementArray = GetArray(json, key, isRequired);

    std::vector<std::shared_ptr<BaseActionElement>> elements;

    if (elementArray.empty())
    {
        return elements;
    }

    elements.reserve(elementArray.size());

    for (const auto& curJsonValue : elementArray)
    {
        auto action = ParseUtil::GetActionFromJsonValue(curJsonValue);
        if (action != nullptr)
        {
            elements.push_back(action);
        }
    }

    return elements;
}

ParseUtil::ParseUtil()
{
}

ParseUtil::~ParseUtil()
{
}

}