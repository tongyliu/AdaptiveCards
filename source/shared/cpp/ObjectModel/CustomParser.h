#pragma once
#include "pch.h"

namespace AdaptiveCards
{
    class BaseCardElement;
    class ICustomParser
    {
    public:
        virtual std::shared_ptr<BaseCardElement> Deserialize(const Json::Value& value) = 0;
    };
}